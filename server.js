const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const root = __dirname;
const databasePath = path.join(root, "panel-house.db");
const uploadsPath = path.join(root, "uploads");
fs.mkdirSync(uploadsPath, { recursive: true });
const database = new DatabaseSync(databasePath);
const sessions = new Map();
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

database.exec(`CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT NOT NULL
)`);
database.exec(
  "CREATE UNIQUE INDEX IF NOT EXISTS users_name_unique ON users(name)",
);
database.exec(`CREATE TABLE IF NOT EXISTS book_stats (
  book_id TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  rating_total REAL NOT NULL DEFAULT 0,
  rating_count INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS book_views (
  book_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (book_id, user_id)
);
CREATE TABLE IF NOT EXISTS book_ratings (
  book_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TEXT NOT NULL,
  PRIMARY KEY (book_id, user_id)
);
CREATE TABLE IF NOT EXISTS user_bookmarks (
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_id, book_id)
);
CREATE TABLE IF NOT EXISTS user_continue_reading (
  user_id TEXT NOT NULL,
  book_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_id, book_id)
);
CREATE TABLE IF NOT EXISTS published_books (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  genre TEXT NOT NULL,
  chapter_title TEXT NOT NULL DEFAULT 'Chapter One',
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS published_book_pages (
  book_id TEXT NOT NULL,
  page_index INTEGER NOT NULL,
  image TEXT NOT NULL,
  PRIMARY KEY (book_id, page_index)
)`);
if (
  !database
    .prepare("PRAGMA table_info(published_books)")
    .all()
    .some((column) => column.name === "chapter_title")
) {
  database.exec(
    "ALTER TABLE published_books ADD COLUMN chapter_title TEXT NOT NULL DEFAULT 'Chapter One'",
  );
}
function findUser(email) {
  return database
    .prepare(
      "SELECT id, email, name, password, created_at AS createdAt FROM users WHERE email = ?",
    )
    .get(email);
}
function createUser(user) {
  database
    .prepare(
      "INSERT INTO users (id, email, name, password, created_at) VALUES (?, ?, ?, ?, ?)",
    )
    .run(user.id, user.email, user.name, user.password, user.createdAt);
}
function hash(password, salt = crypto.randomBytes(16).toString("hex")) {
  return `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;
}
function validPassword(password, stored) {
  const [salt, key] = stored.split(":");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(
    Buffer.from(key, "hex"),
    Buffer.from(derived, "hex"),
  );
}
function token() {
  return crypto.randomBytes(32).toString("hex");
}
function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Content-Type": "application/json", ...headers });
  res.end(JSON.stringify(body));
}
function userFrom(req) {
  const match = (req.headers.cookie || "").match(/panel_session=([^;]+)/);
  return match ? sessions.get(match[1]) : null;
}
function body(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}
function publicUser(user) {
  return { id: user.id, email: user.email, name: user.name, username: user.name };
}
function bookId(req) {
  return decodeURIComponent(req.url.split("/")[3] || "").split("?")[0];
}
function bookStats(id, userId = "") {
  database
    .prepare("INSERT OR IGNORE INTO book_stats (book_id) VALUES (?)")
    .run(id);
  const stats = database
    .prepare(
      "SELECT views, rating_total AS ratingTotal, rating_count AS ratingCount FROM book_stats WHERE book_id = ?",
    )
    .get(id);
  return {
    ...stats,
    hasViewed: Boolean(
      userId &&
      database
        .prepare("SELECT 1 FROM book_views WHERE book_id = ? AND user_id = ?")
        .get(id, userId),
    ),
    hasRated: Boolean(
      userId &&
      database
        .prepare("SELECT 1 FROM book_ratings WHERE book_id = ? AND user_id = ?")
        .get(id, userId),
    ),
  };
}
function creatorBooks(userId = null) {
  return database
    .prepare(
      `SELECT b.id, b.title, b.creator, b.genre, b.chapter_title AS chapterTitle,
        b.image, b.description AS desc,
        b.created_at AS createdAt,
        COALESCE(s.views, 0) AS views,
        COALESCE(s.rating_total, 0) AS ratingTotal,
        COALESCE(s.rating_count, 0) AS ratingCount,
        (SELECT COUNT(*) FROM comments c WHERE c.book_id = b.id) AS commentCount
       FROM published_books b
       LEFT JOIN book_stats s ON s.book_id = b.id
       ${userId ? "WHERE b.owner_id = ?" : ""}
       ORDER BY b.created_at DESC`,
    )
     .all(...(userId ? [userId] : []))
     .map((book) => ({
       ...book,
       pages: database
         .prepare(
           "SELECT image FROM published_book_pages WHERE book_id = ? ORDER BY page_index",
         )
         .all(book.id)
         .map((page) => page.image),
     }));
}

async function api(req, res) {
  if (req.method === "GET" && req.url === "/api/me/books") {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Not signed in" });
    return send(res, 200, { books: creatorBooks(user.id) });
  }
  if (req.method === "GET" && req.url === "/api/books/published") {
    return send(res, 200, { books: creatorBooks() });
  }
  if (req.method === "POST" && req.url === "/api/me/books") {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Sign in to publish a book." });
    const input = await body(req);
    const title = String(input.title || "").trim();
    const creator = String(input.creator || "").trim();
    const genre = String(input.genre || "").trim();
    const chapterTitle = String(input.chapterTitle || "").trim();
    const image = String(input.image || "").trim();
    const pages = Array.isArray(input.pages) ? input.pages : [];
    if (
      !title ||
      !creator ||
      !genre ||
      !chapterTitle ||
      chapterTitle.length > 80 ||
      !/^\/uploads\/[A-Za-z0-9._-]+$/.test(image) ||
      pages.length > 50 ||
      pages.some(
        (page) =>
          typeof page !== "string" ||
          !/^\/uploads\/[A-Za-z0-9._-]+$/.test(page),
      )
    )
      return send(res, 400, {
        error:
          "Complete the book details, enter a chapter title, choose a valid cover, and upload no more than 50 valid chapter pages.",
      });
    const id = `published-${crypto.randomUUID()}`;
    database.exec("BEGIN");
    try {
      database
        .prepare(
          "INSERT INTO published_books (id, owner_id, title, creator, genre, chapter_title, image, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .run(id, user.id, title, creator, genre, chapterTitle, image, "A fresh story from the Panel House community.", new Date().toISOString());
      const insertPage = database.prepare(
        "INSERT INTO published_book_pages (book_id, page_index, image) VALUES (?, ?, ?)",
      );
      pages.forEach((page, index) => insertPage.run(id, index, page));
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      return send(res, 500, { error: "Could not publish the book." });
    }
    const book = creatorBooks(user.id).find((item) => item.id === id);
    return send(res, 201, { book });
  }
  if (req.method === "DELETE" && /^\/api\/me\/books\/[^/]+$/.test(req.url)) {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Not signed in" });
    const id = decodeURIComponent(req.url.split("/")[4] || "").split("?")[0];
    const book = database
      .prepare("SELECT id, image FROM published_books WHERE id = ? AND owner_id = ?")
      .get(id, user.id);
    if (!book) return send(res, 404, { error: "Book not found." });
    const pages = database
      .prepare("SELECT image FROM published_book_pages WHERE book_id = ?")
      .all(id)
      .map((page) => page.image);
    database.exec("BEGIN");
    try {
      database.prepare("DELETE FROM published_book_pages WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM comments WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM book_views WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM book_ratings WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM user_bookmarks WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM user_continue_reading WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM book_stats WHERE book_id = ?").run(id);
      database.prepare("DELETE FROM published_books WHERE id = ? AND owner_id = ?").run(id, user.id);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      return send(res, 500, { error: "Could not delete the book." });
    }
    if (book.image.startsWith("/uploads/")) {
      const uploadFile = path.resolve(uploadsPath, path.basename(book.image));
      if (uploadFile.startsWith(uploadsPath) && fs.existsSync(uploadFile)) fs.unlinkSync(uploadFile);
    }
    pages.forEach((page) => {
      if (!page.startsWith("/uploads/")) return;
      const uploadFile = path.resolve(uploadsPath, path.basename(page));
      if (uploadFile.startsWith(uploadsPath) && fs.existsSync(uploadFile)) fs.unlinkSync(uploadFile);
    });
    return send(res, 200, { ok: true });
  }
  if (req.method === "GET" && req.url === "/api/me/library") {
    const user = userFrom(req); if (!user) return send(res, 401, { error: "Not signed in" });
    return send(res, 200, { bookmarks: database.prepare("SELECT book_id AS id FROM user_bookmarks WHERE user_id = ? ORDER BY created_at DESC").all(user.id).map((row) => row.id), continueReading: database.prepare("SELECT book_id AS id FROM user_continue_reading WHERE user_id = ? ORDER BY created_at ASC").all(user.id).map((row) => row.id) });
  }
  if (req.method === "POST" && req.url === "/api/me/library") {
    const user = userFrom(req); if (!user) return send(res, 401, { error: "Not signed in" }); const input = await body(req); const bookmarks = Array.isArray(input.bookmarks) ? input.bookmarks : []; const continueReading = Array.isArray(input.continueReading) ? input.continueReading : [];
    database.exec("BEGIN"); try { database.prepare("DELETE FROM user_bookmarks WHERE user_id = ?").run(user.id); database.prepare("DELETE FROM user_continue_reading WHERE user_id = ?").run(user.id); const bookmarkInsert = database.prepare("INSERT OR IGNORE INTO user_bookmarks (user_id, book_id, created_at) VALUES (?, ?, ?)"); const continueInsert = database.prepare("INSERT OR IGNORE INTO user_continue_reading (user_id, book_id, created_at) VALUES (?, ?, ?)"); bookmarks.forEach((id, index) => bookmarkInsert.run(user.id, String(id), new Date(Date.now() + index).toISOString())); continueReading.forEach((id, index) => continueInsert.run(user.id, String(id), new Date(Date.now() + index).toISOString())); database.exec("COMMIT"); } catch (error) { database.exec("ROLLBACK"); return send(res, 400, { error: "Could not save your personal library." }); } return send(res, 200, { ok: true });
  }
  if (req.method === "POST" && req.url === "/api/uploads") {
    if (!userFrom(req))
      return send(res, 401, { error: "Sign in to upload images." });
    const input = await body(req);
    const match = String(input.data || "").match(
      /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/,
    );
    if (!match)
      return send(res, 400, { error: "Choose a JPG, PNG, or WebP image." });
    const buffer = Buffer.from(match[2], "base64");
    if (buffer.length > 8 * 1024 * 1024)
      return send(res, 413, {
        error: "Each image must be smaller than 8 MB.",
      });
    const extension =
      match[1] === "image/jpeg" ? "jpg" : match[1].split("/")[1];
    const filename = `${crypto.randomUUID()}.${extension}`;
    fs.writeFileSync(path.join(uploadsPath, filename), buffer);
    return send(res, 201, { path: `/uploads/${filename}` });
  }
  if (req.method === "GET" && req.url === "/api/me") {
    const user = userFrom(req);
    return user
      ? send(res, 200, { user: publicUser(user) })
      : send(res, 401, { error: "Not signed in" });
  }
  if (req.method === "GET" && req.url === "/api/books/stats") {
    const rows = database
      .prepare(
        "SELECT book_id AS bookId, views, rating_total AS ratingTotal, rating_count AS ratingCount FROM book_stats",
      )
      .all();
    return send(res, 200, { stats: rows });
  }
  if (req.method === "POST" && /^\/api\/books\/[^/]+\/view$/.test(req.url)) {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Sign in to view this book." });
    const id = bookId(req);
    database
      .prepare("INSERT OR IGNORE INTO book_stats (book_id) VALUES (?)")
      .run(id);
    const result = database
      .prepare(
        "INSERT OR IGNORE INTO book_views (book_id, user_id, created_at) VALUES (?, ?, ?)",
      )
      .run(id, user.id, new Date().toISOString());
    if (result.changes)
      database
        .prepare("UPDATE book_stats SET views = views + 1 WHERE book_id = ?")
        .run(id);
    return send(res, 200, { stats: bookStats(id, user.id) });
  }
  if (req.method === "GET" && /^\/api\/books\/[^/]+\/comments$/.test(req.url)) {
    return send(res, 200, {
      comments: database
        .prepare(
          "SELECT id, username AS name, text, created_at AS createdAt FROM comments WHERE book_id = ? ORDER BY id DESC",
        )
        .all(bookId(req)),
    });
  }
  if (req.method === "POST" && /^\/api\/books\/[^/]+\/rating$/.test(req.url)) {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Sign in to rate this book." });
    const input = await body(req);
    const rating = Number(input.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5)
      return send(res, 400, { error: "Rating must be between 1 and 5." });
    const id = bookId(req);
    database
      .prepare("INSERT OR IGNORE INTO book_stats (book_id) VALUES (?)")
      .run(id);
    try {
      database
        .prepare(
          "INSERT INTO book_ratings (book_id, user_id, rating, created_at) VALUES (?, ?, ?, ?)",
        )
        .run(id, user.id, rating, new Date().toISOString());
    } catch (error) {
      return send(res, 409, { error: "You have already rated this book." });
    }
    database
      .prepare(
        "UPDATE book_stats SET rating_total = rating_total + ?, rating_count = rating_count + 1 WHERE book_id = ?",
      )
      .run(rating, id);
    return send(res, 200, { stats: bookStats(id, user.id) });
  }
  if (
    req.method === "POST" &&
    /^\/api\/books\/[^/]+\/comments$/.test(req.url)
  ) {
    const user = userFrom(req);
    if (!user) return send(res, 401, { error: "Sign in to comment." });
    const input = await body(req);
    const text = String(input.text || "").trim();
    if (!text || text.length > 500)
      return send(res, 400, {
        error: "Comment must be between 1 and 500 characters.",
      });
    const id = bookId(req);
    database
      .prepare(
        "INSERT INTO comments (book_id, user_id, username, text, created_at) VALUES (?, ?, ?, ?, ?)",
      )
      .run(id, user.id, user.name, text, new Date().toISOString());
    return send(res, 201, {
      comments: database
        .prepare(
          "SELECT id, username AS name, text, created_at AS createdAt FROM comments WHERE book_id = ? ORDER BY id DESC",
        )
        .all(id),
    });
  }
  if (
    req.method === "POST" &&
    (req.url === "/api/auth/signup" || req.url === "/api/auth/signin")
  ) {
    const input = await body(req);
    const email = String(input.email || "")
      .trim()
      .toLowerCase();
    const username = String(input.username || "").trim();
    const usernameKey = username.toLowerCase();
    const password = String(input.password || "");
    if (!email || password.length < 6)
      return send(res, 400, {
        error: "Use a valid email and a password with at least 6 characters.",
      });
    const existing = findUser(email);
    if (req.url.endsWith("signup")) {
      if (!/^[a-z0-9_]{3,20}$/.test(username))
        return send(res, 400, {
          error:
            "Username must be 3-20 characters using letters, numbers, or underscores.",
        });
      if (existing)
        return send(res, 409, {
          error: "An account with that email already exists.",
        });
      if (database.prepare("SELECT id FROM users WHERE lower(name) = ?").get(usernameKey))
        return send(res, 409, { error: "That username is already taken." });
      const user = {
        id: crypto.randomUUID(),
        email,
        name: username,
        password: hash(password),
        createdAt: new Date().toISOString(),
      };
      createUser(user);
      const session = token();
      sessions.set(session, user);
      return send(
        res,
        201,
        { user: publicUser(user) },
        {
          "Set-Cookie": `panel_session=${session}; HttpOnly; SameSite=Lax; Path=/`,
        },
      );
    }
    if (!existing || !validPassword(password, existing.password))
      return send(res, 401, { error: "Email or password is incorrect." });
    const session = token();
    sessions.set(session, existing);
    return send(
      res,
      200,
      { user: publicUser(existing) },
      {
        "Set-Cookie": `panel_session=${session}; HttpOnly; SameSite=Lax; Path=/`,
      },
    );
  }
  if (req.method === "POST" && req.url === "/api/auth/logout") {
    const match = (req.headers.cookie || "").match(/panel_session=([^;]+)/);
    if (match) sessions.delete(match[1]);
    return send(
      res,
      200,
      { ok: true },
      {
        "Set-Cookie":
          "panel_session=; Max-Age=0; HttpOnly; SameSite=Lax; Path=/",
      },
    );
  }
  return send(res, 404, { error: "Not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) return await api(req, res);
    if (req.url.startsWith("/uploads/")) {
      const uploadFile = path.resolve(
        uploadsPath,
        decodeURIComponent(req.url.slice("/uploads/".length)),
      );
      if (!uploadFile.startsWith(uploadsPath) || !fs.existsSync(uploadFile))
        return res.writeHead(404).end("Not found");
      res.writeHead(200, {
        "Content-Type":
          mime[path.extname(uploadFile)] || "application/octet-stream",
      });
      return fs.createReadStream(uploadFile).pipe(res);
    }
    const requested = decodeURIComponent(req.url.split("?")[0]);
    const file = path.resolve(
      root,
      requested === "/" ? "index.html" : `.${requested}`,
    );
    if (
      !file.startsWith(root) ||
      !fs.existsSync(file) ||
      fs.statSync(file).isDirectory()
    )
      return res.writeHead(404).end("Not found");
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
    });
    fs.createReadStream(file).pipe(res);
  } catch (error) {
    send(res, 500, { error: "Server error" });
  }
});
const port = Number(process.env.PORT) || 3000;
server.listen(port, "0.0.0.0", () =>
  console.log(`Panel House running on port ${port}`),
);
