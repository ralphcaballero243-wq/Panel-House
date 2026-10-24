const authArtImages = [
  "img/The Nice House by the Sea.jpg",
  "img/SandMan.jpg",
  "img/ultimate_spiderman.jpg",
];
const authArtStyle = document.createElement("style");
authArtStyle.textContent =
  '.auth-art{position:relative;overflow:hidden;background:#121312}.auth-art:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#121312d9,#12131244 75%),linear-gradient(0deg,#12131266,transparent 60%);z-index:3;pointer-events:none}.auth-art-layer{position:absolute;inset:0;background-position:center;background-size:cover;opacity:0;transform:scale(1.04);transition:opacity 1.4s ease,transform 7s ease}.auth-art-layer.active{opacity:1;transform:scale(1)}@media(prefers-reduced-motion:reduce){.auth-art-layer{transition:none}}';
document.head.append(authArtStyle);
const authArtObserver = new MutationObserver(() => {
  const art = document.querySelector("#authGate .auth-art");
  if (!art) return;
  authArtObserver.disconnect();
  art.innerHTML =
    '<div class="auth-art-layer active"></div><div class="auth-art-layer"></div><div class="auth-art-layer"></div>'; 
  const layers = [...art.querySelectorAll(".auth-art-layer")];
  layers.forEach(
    (layer, index) =>
      (layer.style.backgroundImage = `url("${authArtImages[index]}")`),
  );
  let activeLayer = 0;
  setInterval(() => {
    layers[activeLayer].classList.remove("active");
    activeLayer = (activeLayer + 1) % layers.length;
    layers[activeLayer].classList.add("active");
  }, 5200);
});
authArtObserver.observe(document.body, { childList: true });
const covers = "img/";
const chapters = {
  batman: {
    folder: "Absolute Batman",
    pages: [
      "Screenshot 2026-10-23 142246.png",
      "Screenshot 2026-10-23 143111.png",
      "Screenshot 2026-10-23 143137.png",
      "Screenshot 2026-10-23 143259.png",
      "Screenshot 2026-10-23 143353.png",
      "Screenshot 2026-10-23 143620.png",
      "Screenshot 2026-10-23 143747.png",
      "Screenshot 2026-10-23 143821.png",
      "Screenshot 2026-10-23 143910.png",
      "Screenshot 2026-10-23 144009.png",
      "Screenshot 2026-10-23 144343.png",
      "Screenshot 2026-10-23 144430.png",
      "Screenshot 2026-10-23 144522.png",
      "Screenshot 2026-10-23 144557.png",
      "Screenshot 2026-10-23 144619.png",
      "Screenshot 2026-10-23 144650.png",
      "Screenshot 2026-10-23 144742.png",
    ],
  },
  superman: {
    folder: "Absolute Superman",
    pages: [
      "Screenshot 2026-10-23 145952.png",
      "Screenshot 2026-10-23 150018.png",
      "Screenshot 2026-10-23 150108.png",
      "Screenshot 2026-10-23 150155.png",
      "Screenshot 2026-10-23 150230.png",
      "Screenshot 2026-10-23 150409.png",
      "Screenshot 2026-10-23 150431.png",
      "Screenshot 2026-10-23 150515.png",
      "Screenshot 2026-10-23 150542.png",
      "Screenshot 2026-10-23 150609.png",
      "Screenshot 2026-10-23 150639.png",
      "Screenshot 2026-10-23 150727.png",
    ],
  },
  spiderman: {
    folder: "Ultimate Spiderman",
    pages: [
      "Screenshot 2026-10-23 151332.png",
      "Screenshot 2026-10-23 151352.png",
      "Screenshot 2026-10-23 151429.png",
      "Screenshot 2026-10-23 151508.png",
      "Screenshot 2026-10-23 151607.png",
      "Screenshot 2026-10-23 151656.png",
      "Screenshot 2026-10-23 151740.png",
      "Screenshot 2026-10-23 151829.png",
      "Screenshot 2026-10-23 151903.png",
      "Screenshot 2026-10-23 151925.png",
      "Screenshot 2026-10-23 152011.png",
      "Screenshot 2026-10-23 152044.png",
      "Screenshot 2026-10-23 152115.png",
      "Screenshot 2026-10-23 152147.png",
      "Screenshot 2026-10-23 152223.png",
      "Screenshot 2026-10-23 152401.png",
    ],
  },
  flash: {
    folder: "Absolute Flash",
    pages: [
      "Screenshot 2026-10-23 153455.png",
      "Screenshot 2026-10-23 153520.png",
      "Screenshot 2026-10-23 153540.png",
      "Screenshot 2026-10-23 153558.png",
      "Screenshot 2026-10-23 153641.png",
      "Screenshot 2026-10-23 153658.png",
      "Screenshot 2026-10-23 153722.png",
      "Screenshot 2026-10-23 153741.png",
      "Screenshot 2026-10-23 153758.png",
      "Screenshot 2026-10-23 153815.png",
      "Screenshot 2026-10-23 153841.png",
      "Screenshot 2026-10-23 153901.png",
      "Screenshot 2026-10-23 153916.png",
      "Screenshot 2026-10-23 153939.png",
      "Screenshot 2026-10-23 154005.png",
    ],
  },
  spider: {
    folder: "Spider-Verse",
    pages: [
      "Screenshot 2026-10-23 155016.png",
      "Screenshot 2026-10-23 155109.png",
      "Screenshot 2026-10-23 155131.png",
      "Screenshot 2026-10-23 155156.png",
      "Screenshot 2026-10-23 155220.png",
      "Screenshot 2026-10-23 155248.png",
      "Screenshot 2026-10-23 155327.png",
      "Screenshot 2026-10-23 155347.png",
      "Screenshot 2026-10-23 155414.png",
      "Screenshot 2026-10-23 155434.png",
      "Screenshot 2026-10-23 155503.png",
      "Screenshot 2026-10-23 155527.png",
      "Screenshot 2026-10-23 155548.png",
      "Screenshot 2026-10-23 155607.png",
      "Screenshot 2026-10-23 155630.png",
      "Screenshot 2026-10-23 155650.png",
      "Screenshot 2026-10-23 155710.png",
      "Screenshot 2026-10-23 155727.png",
      "Screenshot 2026-10-23 155749.png",
      "Screenshot 2026-10-23 155814.png",
      "Screenshot 2026-10-23 155834.png",
    ],
  },
  "green-lantern": {
    folder: "Green Lantern",
    pages: [
      "Screenshot 2026-10-23 231348.png",
      "Screenshot 2026-10-23 231418.png",
      "Screenshot 2026-10-23 231441.png",
      "Screenshot 2026-10-23 231504.png",
      "Screenshot 2026-10-23 231526.png",
      "Screenshot 2026-10-23 231605.png",
      "Screenshot 2026-10-23 231621.png",
      "Screenshot 2026-10-23 231634.png",
      "Screenshot 2026-10-23 231648.png",
      "Screenshot 2026-10-23 231707.png",
      "Screenshot 2026-10-23 231731.png",
      "Screenshot 2026-10-23 232005.png",
      "Screenshot 2026-10-23 232137.png",
      "Screenshot 2026-10-23 232156.png",
      "Screenshot 2026-10-23 232218.png",
      "Screenshot 2026-10-23 232232.png",
      "Screenshot 2026-10-23 232246.png",
      "Screenshot 2026-10-23 232300.png",
      "Screenshot 2026-10-23 232317.png",
      "Screenshot 2026-10-23 232338.png",
      "Screenshot 2026-10-23 232353.png",
    ],
  },
  invincible: {
    folder: "Invincible",
    pages: [
      "Screenshot 2026-10-23 234429.png",
      "Screenshot 2026-10-23 234450.png",
      "Screenshot 2026-10-23 234507.png",
      "Screenshot 2026-10-23 234612.png",
      "Screenshot 2026-10-23 234626.png",
      "Screenshot 2026-10-23 234640.png",
      "Screenshot 2026-10-23 234703.png",
      "Screenshot 2026-10-23 234724.png",
      "Screenshot 2026-10-23 234743.png",
      "Screenshot 2026-10-23 234757.png",
      "Screenshot 2026-10-23 234810.png",
      "Screenshot 2026-10-23 234831.png",
      "Screenshot 2026-10-23 234842.png",
      "Screenshot 2026-10-23 234856.png",
      "Screenshot 2026-10-23 234908.png",
      "Screenshot 2026-10-23 234924.png",
      "Screenshot 2026-10-23 234939.png",
      "Screenshot 2026-10-23 234955.png",
      "Screenshot 2026-10-23 235008.png",
      "Screenshot 2026-10-23 235029.png",
      "Screenshot 2026-10-23 235056.png",
      "Screenshot 2026-10-23 235113.png",
    ],
  },
  sandman: {
    folder: "The Sandman",
    pages: [
      "Screenshot 2026-10-24 000809.png",
      "Screenshot 2026-10-24 000824.png",
      "Screenshot 2026-10-24 000857.png",
      "Screenshot 2026-10-24 000921.png",
      "Screenshot 2026-10-24 000936.png",
      "Screenshot 2026-10-24 000954.png",
      "Screenshot 2026-10-24 001006.png",
      "Screenshot 2026-10-24 001033.png",
      "Screenshot 2026-10-24 001046.png",
      "Screenshot 2026-10-24 001059.png",
      "Screenshot 2026-10-24 001120.png",
      "Screenshot 2026-10-24 001129.png",
      "Screenshot 2026-10-24 001141.png",
      "Screenshot 2026-10-24 001153.png",
      "Screenshot 2026-10-24 001205.png",
      "Screenshot 2026-10-24 001221.png",
      "Screenshot 2026-10-24 001232.png",
    ],
  },
  monstress: {
    folder: "Monstress",
    pages: [
      "Screenshot 2026-10-24 001855.png",
      "Screenshot 2026-10-24 001915.png",
      "Screenshot 2026-10-24 001931.png",
      "Screenshot 2026-10-24 001941.png",
      "Screenshot 2026-10-24 001956.png",
      "Screenshot 2026-10-24 002011.png",
      "Screenshot 2026-10-24 002025.png",
      "Screenshot 2026-10-24 002039.png",
      "Screenshot 2026-10-24 002048.png",
      "Screenshot 2026-10-24 002059.png",
      "Screenshot 2026-10-24 002111.png",
      "Screenshot 2026-10-24 002128.png",
      "Screenshot 2026-10-24 002139.png",
      "Screenshot 2026-10-24 002149.png",
      "Screenshot 2026-10-24 002220.png",
      "Screenshot 2026-10-24 002241.png",
      "Screenshot 2026-10-24 002251.png",
      "Screenshot 2026-10-24 002301.png",
      "Screenshot 2026-10-24 002315.png",
      "Screenshot 2026-10-24 002326.png",
      "Screenshot 2026-10-24 002339.png",
      "Screenshot 2026-10-24 002353.png",
    ],
  },
  black: {
    folder: "Black Panther",
    pages: [
      "Screenshot 2026-10-24 002947.png",
      "Screenshot 2026-10-24 003003.png",
      "Screenshot 2026-10-24 003019.png",
      "Screenshot 2026-10-24 003028.png",
      "Screenshot 2026-10-24 003041.png",
      "Screenshot 2026-10-24 003050.png",
      "Screenshot 2026-10-24 003110.png",
      "Screenshot 2026-10-24 003127.png",
      "Screenshot 2026-10-24 003146.png",
      "Screenshot 2026-10-24 003156.png",
      "Screenshot 2026-10-24 003205.png",
      "Screenshot 2026-10-24 003217.png",
      "Screenshot 2026-10-24 003227.png",
      "Screenshot 2026-10-24 003235.png",
      "Screenshot 2026-10-24 003243.png",
      "Screenshot 2026-10-24 003253.png",
      "Screenshot 2026-10-24 003302.png",
      "Screenshot 2026-10-24 003310.png",
      "Screenshot 2026-10-24 003324.png",
      "Screenshot 2026-10-24 003333.png",
      "Screenshot 2026-10-24 003344.png",
      "Screenshot 2026-10-24 003359.png",
    ],
  },
  castlevania: {
    folder: "Castlevania",
    pages: [
      "Screenshot 2026-10-24 191054.png",
      "Screenshot 2026-10-24 191120.png",
      "Screenshot 2026-10-24 191130.png",
      "Screenshot 2026-10-24 191140.png",
      "Screenshot 2026-10-24 191148.png",
      "Screenshot 2026-10-24 191156.png",
      "Screenshot 2026-10-24 191205.png",
      "Screenshot 2026-10-24 191214.png",
      "Screenshot 2026-10-24 191221.png",
      "Screenshot 2026-10-24 191229.png",
      "Screenshot 2026-10-24 191236.png",
      "Screenshot 2026-10-24 191253.png",
      "Screenshot 2026-10-24 191301.png",
      "Screenshot 2026-10-24 191313.png",
      "Screenshot 2026-10-24 191321.png",
      "Screenshot 2026-10-24 191328.png",
      "Screenshot 2026-10-24 191336.png",
      "Screenshot 2026-10-24 191347.png",
      "Screenshot 2026-10-24 191355.png",
      "Screenshot 2026-10-24 191405.png",
      "Screenshot 2026-10-24 191415.png",
      "Screenshot 2026-10-24 191424.png",
    ],
  },
  "ghost-rider": {
    folder: "Ghost Rider",
    pages: [
      "Screenshot 2026-10-24 202718.png",
      "Screenshot 2026-10-24 202743.png",
      "Screenshot 2026-10-24 202754.png",
      "Screenshot 2026-10-24 202809.png",
      "Screenshot 2026-10-24 202817.png",
      "Screenshot 2026-10-24 202826.png",
      "Screenshot 2026-10-24 202850.png",
      "Screenshot 2026-10-24 202900.png",
      "Screenshot 2026-10-24 202913.png",
      "Screenshot 2026-10-24 202925.png",
      "Screenshot 2026-10-24 202940.png",
      "Screenshot 2026-10-24 202949.png",
      "Screenshot 2026-10-24 203004.png",
      "Screenshot 2026-10-24 203012.png",
      "Screenshot 2026-10-24 203024.png",
      "Screenshot 2026-10-24 203032.png",
      "Screenshot 2026-10-24 203042.png",
      "Screenshot 2026-10-24 203058.png",
      "Screenshot 2026-10-24 203121.png",
      "Screenshot 2026-10-24 203129.png",
      "Screenshot 2026-10-24 203144.png",
      "Screenshot 2026-10-24 203154.png",
      "Screenshot 2026-10-24 203202.png",
    ],
  },
  "devil-may-cry": {
    folder: "Devil May Cry",
    pages: [
      "Screenshot 2026-10-24 203615.png",
      "Screenshot 2026-10-24 203627.png",
      "Screenshot 2026-10-24 203639.png",
      "Screenshot 2026-10-24 203646.png",
      "Screenshot 2026-10-24 203657.png",
      "Screenshot 2026-10-24 203708.png",
      "Screenshot 2026-10-24 203717.png",
      "Screenshot 2026-10-24 203723.png",
      "Screenshot 2026-10-24 203733.png",
      "Screenshot 2026-10-24 203741.png",
      "Screenshot 2026-10-24 203751.png",
      "Screenshot 2026-10-24 203814.png",
      "Screenshot 2026-10-24 203835.png",
      "Screenshot 2026-10-24 203848.png",
      "Screenshot 2026-10-24 203857.png",
      "Screenshot 2026-10-24 203939.png",
      "Screenshot 2026-10-24 203949.png",
      "Screenshot 2026-10-24 203959.png",
      "Screenshot 2026-10-24 204009.png",
      "Screenshot 2026-10-24 204017.png",
      "Screenshot 2026-10-24 204025.png",
      "Screenshot 2026-10-24 204036.png",
      "Screenshot 2026-10-24 204046.png",
      "Screenshot 2026-10-24 204101.png",
    ],
  },
  "walking-dead": {
    folder: "The Walking Dead",
    pages: [
      "Screenshot 2026-10-24 003942.png",
      "Screenshot 2026-10-24 003957.png",
      "Screenshot 2026-10-24 004008.png",
      "Screenshot 2026-10-24 004018.png",
      "Screenshot 2026-10-24 004030.png",
      "Screenshot 2026-10-24 004046.png",
      "Screenshot 2026-10-24 004058.png",
      "Screenshot 2026-10-24 004109.png",
      "Screenshot 2026-10-24 004125.png",
      "Screenshot 2026-10-24 004139.png",
      "Screenshot 2026-10-24 004200.png",
      "Screenshot 2026-10-24 004212.png",
      "Screenshot 2026-10-24 004225.png",
      "Screenshot 2026-10-24 004237.png",
      "Screenshot 2026-10-24 004251.png",
      "Screenshot 2026-10-24 004303.png",
      "Screenshot 2026-10-24 004311.png",
      "Screenshot 2026-10-24 004320.png",
      "Screenshot 2026-10-24 004329.png",
      "Screenshot 2026-10-24 004337.png",
      "Screenshot 2026-10-24 004346.png",
      "Screenshot 2026-10-24 004400.png",
      "Screenshot 2026-10-24 004412.png",
      "Screenshot 2026-10-24 004449.png",
      "Screenshot 2026-10-24 004508.png",
    ],
  },
  saga: {
    folder: "SAGA",
    pages: [
      "Screenshot 2026-10-24 183111.png",
      "Screenshot 2026-10-24 183125.png",
      "Screenshot 2026-10-24 183204.png",
      "Screenshot 2026-10-24 183213.png",
      "Screenshot 2026-10-24 183220.png",
      "Screenshot 2026-10-24 183237.png",
      "Screenshot 2026-10-24 183258.png",
      "Screenshot 2026-10-24 183306.png",
      "Screenshot 2026-10-24 183312.png",
      "Screenshot 2026-10-24 183322.png",
      "Screenshot 2026-10-24 183339.png",
      "Screenshot 2026-10-24 183349.png",
      "Screenshot 2026-10-24 183419.png",
      "Screenshot 2026-10-24 183428.png",
      "Screenshot 2026-10-24 183436.png",
      "Screenshot 2026-10-24 183445.png",
      "Screenshot 2026-10-24 183453.png",
      "Screenshot 2026-10-24 183504.png",
      "Screenshot 2026-10-24 183511.png",
    ],
  },
  marvel: {
    folder: "Ms. Marvel",
    pages: [
      "Screenshot 2026-10-24 183942.png",
      "Screenshot 2026-10-24 183952.png",
      "Screenshot 2026-10-24 184002.png",
      "Screenshot 2026-10-24 184009.png",
      "Screenshot 2026-10-24 184023.png",
      "Screenshot 2026-10-24 184031.png",
      "Screenshot 2026-10-24 184043.png",
      "Screenshot 2026-10-24 184055.png",
      "Screenshot 2026-10-24 184106.png",
      "Screenshot 2026-10-24 184128.png",
      "Screenshot 2026-10-24 184140.png",
      "Screenshot 2026-10-24 184150.png",
      "Screenshot 2026-10-24 184200.png",
      "Screenshot 2026-10-24 184209.png",
      "Screenshot 2026-10-24 184220.png",
      "Screenshot 2026-10-24 184231.png",
      "Screenshot 2026-10-24 184241.png",
      "Screenshot 2026-10-24 184251.png",
      "Screenshot 2026-10-24 184259.png",
      "Screenshot 2026-10-24 184307.png",
      "Screenshot 2026-10-24 184319.png",
    ],
  },
  paper: {
    folder: "Paper Girls",
    pages: [
      "Screenshot 2026-10-24 181557.png",
      "Screenshot 2026-10-24 181609.png",
      "Screenshot 2026-10-24 181623.png",
      "Screenshot 2026-10-24 181636.png",
      "Screenshot 2026-10-24 181647.png",
      "Screenshot 2026-10-24 181702.png",
      "Screenshot 2026-10-24 181712.png",
      "Screenshot 2026-10-24 181726.png",
      "Screenshot 2026-10-24 181741.png",
      "Screenshot 2026-10-24 181754.png",
      "Screenshot 2026-10-24 181805.png",
      "Screenshot 2026-10-24 181815.png",
      "Screenshot 2026-10-24 181828.png",
      "Screenshot 2026-10-24 181841.png",
      "Screenshot 2026-10-24 181849.png",
      "Screenshot 2026-10-24 181900.png",
      "Screenshot 2026-10-24 181912.png",
      "Screenshot 2026-10-24 181924.png",
      "Screenshot 2026-10-24 181935.png",
      "Screenshot 2026-10-24 181944.png",
      "Screenshot 2026-10-24 181954.png",
      "Screenshot 2026-10-24 182008.png",
      "Screenshot 2026-10-24 182017.png",
      "Screenshot 2026-10-24 182026.png",
      "Screenshot 2026-10-24 182039.png",
      "Screenshot 2026-10-24 182052.png",
      "Screenshot 2026-10-24 182108.png",
      "Screenshot 2026-10-24 182120.png",
      "Screenshot 2026-10-24 182135.png",
      "Screenshot 2026-10-24 182147.png",
      "Screenshot 2026-10-24 182235.png",
    ],
  },
  hunger: {
    folder: "The Hunger and The Dusk",
    pages: [
      "Screenshot 2026-10-24 184617.png",
      "Screenshot 2026-10-24 184625.png",
      "Screenshot 2026-10-24 184633.png",
      "Screenshot 2026-10-24 184644.png",
      "Screenshot 2026-10-24 184655.png",
      "Screenshot 2026-10-24 184710.png",
      "Screenshot 2026-10-24 184719.png",
      "Screenshot 2026-10-24 184728.png",
      "Screenshot 2026-10-24 184739.png",
      "Screenshot 2026-10-24 184752.png",
      "Screenshot 2026-10-24 184813.png",
      "Screenshot 2026-10-24 184824.png",
      "Screenshot 2026-10-24 184836.png",
      "Screenshot 2026-10-24 184851.png",
      "Screenshot 2026-10-24 184902.png",
      "Screenshot 2026-10-24 184910.png",
      "Screenshot 2026-10-24 184927.png",
      "Screenshot 2026-10-24 184942.png",
      "Screenshot 2026-10-24 184951.png",
    ],
  },
};
let comics = [
  {
    id: "spider",
    title: "Spider-Verse",
    creator: "Dan Slott",
    genre: "Superhero",
    rating: "4.8",
    views: "18.4k",
    image: "spider_verse.jpg",
    status: "trending",
    desc: "Miles Morales learns that being a hero is bigger than any one universe.",
  },
  {
    id: "monstress",
    title: "Monstress",
    creator: "Marjorie Liu",
    genre: "Fantasy",
    rating: "4.9",
    views: "12.8k",
    image: "monstress.jpg",
    status: "trending",
    desc: "A young woman and her monster navigate a war-torn world of magic.",
  },
  {
    id: "black",
    title: "Black Panther",
    creator: "Eve L. Ewing",
    genre: "Superhero",
    rating: "4.7",
    views: "9.2k",
    image: "black_panther.jpg",
    status: "library",
    desc: "Wakanda faces a future no king could have predicted.",
  },
  {
    id: "paper",
    title: "Paper Girls",
    creator: "Brian K. Vaughan",
    genre: "Sci-fi",
    rating: "4.6",
    views: "8.7k",
    image: "paper_girls.jpg",
    status: "trending",
    desc: "Four paper delivery girls stumble into the biggest story of their lives.",
  },
  {
    id: "saga",
    title: "SAGA",
    creator: "Brian K. Vaughan",
    genre: "Space opera",
    rating: "4.9",
    views: "22.1k",
    image: "SAGA.jpg",
    status: "library",
    desc: "Two lovers from opposite sides of a galactic war build a family.",
  },
  {
    id: "sandman",
    title: "The Sandman",
    creator: "Neil Gaiman",
    genre: "Mythic fantasy",
    rating: "4.8",
    views: "31.5k",
    image: "SandMan.jpg",
    status: "library",
    desc: "Dream, ruler of stories, returns to a world that forgot his name.",
  },
  {
    id: "marvel",
    title: "Ms. Marvel",
    creator: "G. Willow Wilson",
    genre: "Superhero",
    rating: "4.5",
    views: "11.2k",
    image: "ms.marvel.png",
    status: "new",
    desc: "Kamala Khan finds her shape, her voice, and a hero inside.",
  },
  {
    id: "hunger",
    title: "The Hunger and the Dusk",
    creator: "G. Willow Wilson",
    genre: "Fantasy",
    rating: "4.7",
    views: "7.4k",
    image: "The Hunger and the Dusk.jpg",
    status: "new",
    desc: "Humans and orcs join forces as an older darkness awakens.",
  },
  {
    id: "batman",
    title: "Absolute Batman",
    creator: "Scott Snyder",
    genre: "Superhero",
    rating: "4.6",
    views: "14.9k",
    image: "absulute_batman.jpg",
    status: "new",
    desc: "A new shadow rises over Gotham, with nothing left to lose.",
  },
  {
    id: "spiderman",
    title: "Ultimate Spider-Man",
    creator: "Jonathan Hickman",
    genre: "Superhero",
    rating: "4.8",
    views: "16.3k",
    image: "ultimate_spiderman.jpg",
    status: "new",
    desc: "Peter Parker gets a chance to become Spider-Man on his own terms.",
  },
  {
    id: "superman",
    title: "Absolute Superman",
    creator: "Jason Aaron",
    genre: "Superhero",
    rating: "0.0",
    views: "0",
    image: "Absolute Superman.jpg",
    status: "library",
    desc: "A new vision of Superman begins with a hero who has everything to prove.",
  },
  {
    id: "walking-dead",
    title: "The Walking Dead",
    creator: "Robert Kirkman",
    genre: "Horror",
    rating: "0.0",
    views: "0",
    image: "The Waking Dead.jpg",
    status: "library",
    desc: "Survivors search for safety while the world they knew disappears behind them.",
  },
  {
    id: "green-lantern",
    title: "Green Lantern",
    creator: "Jeremy Adams",
    genre: "Superhero",
    rating: "0.0",
    views: "0",
    image: "Green Lanthern.jpg",
    status: "library",
    desc: "A new ring-bearer faces the impossible with willpower and imagination.",
  },
  {
    id: "castlevania",
    title: "Castlevania",
    creator: "Warren Ellis",
    genre: "Dark fantasy",
    rating: "0.0",
    views: "0",
    image: "Castlevania.jpg",
    status: "library",
    desc: "Night creatures rise as one hunter answers an ancient call to arms.",
  },
  {
    id: "invincible",
    title: "Invincible",
    creator: "Robert Kirkman",
    genre: "Superhero",
    rating: "0.0",
    views: "0",
    image: "Invincible.jpg",
    status: "library",
    desc: "Mark Grayson discovers that becoming a hero is only the beginning.",
  },
  {
    id: "flash",
    title: "Absolute Flash",
    creator: "Jeff Lemire",
    genre: "Superhero",
    rating: "0.0",
    views: "0",
    image: "Absolute Flash.jpg",
    status: "library",
    desc: "Speed changes everything when Barry Allen enters a faster, stranger world.",
  },
  {
    id: "ghost-rider",
    title: "Ghost Rider",
    creator: "Johnny Blaze",
    genre: "Horror",
    rating: "0.0",
    views: "0",
    image: "Ghost Rider.jpg",
    status: "library",
    desc: "A cursed rider burns through the night in pursuit of supernatural justice.",
  },
  {
    id: "devil-may-cry",
    title: "Devil May Cry",
    creator: "Capcom",
    genre: "Dark fantasy",
    rating: "0.0",
    views: "0",
    image: "Devil May Cry.jpg",
    status: "library",
    desc: "A stylish demon hunter takes on the creatures waiting beyond the human world.",
  },
];
const state = {
  view: "library",
  bookmarks: [],
  comments: JSON.parse(localStorage.getItem("ph-comments") || "{}"),
  ratings: JSON.parse(localStorage.getItem("ph-ratings") || "{}"),
  bookStats: {},
  continueReading: [],
  creatorBooks: [],
  user: localStorage.getItem("ph-user") || "",
};
const $ = (s) => document.querySelector(s),
  grid = $("#comicGrid");
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
function personalKey(name) {
  return `${name}-${encodeURIComponent(state.user || "guest")}`;
}
async function loadPersonalState() {
  const bookmarksKey = personalKey("ph-bookmarks");
  const continueKey = personalKey("ph-continue-reading");
  const legacyBookmarks = localStorage.getItem("ph-bookmarks");
  const legacyContinue = localStorage.getItem("ph-continue-reading");
  state.bookmarks = JSON.parse(localStorage.getItem(bookmarksKey) || (state.user && legacyBookmarks ? legacyBookmarks : "[]"));
  state.continueReading = JSON.parse(localStorage.getItem(continueKey) || (state.user && legacyContinue ? legacyContinue : "[]"));
  if (state.user && !localStorage.getItem(bookmarksKey) && legacyBookmarks) { localStorage.setItem(bookmarksKey, JSON.stringify(state.bookmarks)); localStorage.removeItem("ph-bookmarks"); }
  if (state.user && !localStorage.getItem(continueKey) && legacyContinue) { localStorage.setItem(continueKey, JSON.stringify(state.continueReading)); localStorage.removeItem("ph-continue-reading"); }
  try { const response = await fetch("/api/me/library", { credentials: "same-origin" }); if (response.ok) { const result = await responseData(response); state.bookmarks = result.bookmarks || []; state.continueReading = result.continueReading || []; } } catch (error) {}
}
function save() {
  localStorage.setItem(personalKey("ph-bookmarks"), JSON.stringify(state.bookmarks));
  localStorage.setItem("ph-comments", JSON.stringify(state.comments));
  localStorage.setItem("ph-ratings", JSON.stringify(state.ratings));
  localStorage.setItem("ph-user", state.user);
  localStorage.setItem(personalKey("ph-continue-reading"), JSON.stringify(state.continueReading));
  if (state.user) fetch("/api/me/library", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ bookmarks: state.bookmarks, continueReading: state.continueReading }) }).catch(() => {});
}
function removeUnknownBookmarks() {
  const validIds = new Set(comics.map((comic) => comic.id));
  const bookmarks = state.bookmarks.filter((id) => validIds.has(id));
  if (bookmarks.length === state.bookmarks.length) return;
  state.bookmarks = bookmarks;
  save();
}
loadPersonalState();
function toast(t) {
  const x = $("#toast");
  x.textContent = t;
  x.classList.add("show");
  setTimeout(() => x.classList.remove("show"), 2300);
}
function updateAccountStatus() {
  const status = $("#accountStatus");
  if (status) status.innerHTML = `Signed in as <strong>@${state.user || "guest"}</strong>`;
}
function applyUser(result) {
  state.user = result.user.username || result.user.name;
  updateAccountStatus();
  const profile = $("#profileButton .profile-name");
  if (profile) profile.textContent = state.user;
}
async function responseData(response) {
  const text = await response.text();
  if (
    response.status === 403 &&
    /File does not reside within a trusted folder/i.test(text)
  )
    return {
      error:
        "This preview server is blocking sign-in. Run `npm start` in the project folder, then open http://localhost:3000 instead of using a static preview.",
    };
  try {
    return JSON.parse(text);
  } catch (error) {
    return { error: text || `Request failed (${response.status})` };
  }
}
function mergePublishedBooks(books) {
  comics = comics.filter((comic) => !comic.published).concat(
    books.map((book) => ({ ...book, status: "new", published: true })),
  );
}
async function loadPublishedBooks() {
  try {
    const [publicResponse, creatorResponse] = await Promise.all([
      fetch("/api/books/published", { credentials: "same-origin" }),
      fetch("/api/me/books", { credentials: "same-origin" }),
    ]);
    if (publicResponse.ok) {
      const result = await responseData(publicResponse);
      mergePublishedBooks(result.books || []);
    }
    if (creatorResponse.ok) {
      const result = await responseData(creatorResponse);
      state.creatorBooks = result.books || [];
    }
    removeUnknownBookmarks();
    render();
  } catch (error) {}
}
function renderCreatorDashboard() {
  const books = state.creatorBooks;
  const totals = books.reduce(
    (summary, book) => ({
      reads: summary.reads + Number(book.views || 0),
      ratings: summary.ratings + Number(book.ratingCount || 0),
      comments: summary.comments + Number(book.commentCount || 0),
    }),
    { reads: 0, ratings: 0, comments: 0 },
  );
  $("#creatorDashboard").innerHTML = `<div class="creator-summary"><div><span>Total reads</span><strong>${totals.reads}</strong></div><div><span>Ratings</span><strong>${totals.ratings}</strong></div><div><span>Comments</span><strong>${totals.comments}</strong></div></div><div class="creator-book-list">${books.length ? books.map((book) => { const average = book.ratingCount ? (book.ratingTotal / book.ratingCount).toFixed(1) : "0.0"; return `<article class="creator-book"><img src="${book.image}" alt="${book.title} cover"><div class="creator-book-info"><p class="eyebrow">${book.genre}</p><h2>${book.title}</h2><p>By ${book.creator}</p><div class="creator-metrics"><span><strong>${average}</strong> rating</span><span><strong>${book.views || 0}</strong> reads</span><span><strong>${book.commentCount || 0}</strong> comments</span></div></div><button class="delete-book" data-delete-book="${book.id}" type="button">Delete book</button></article>`; }).join("") : '<div class="creator-empty"><h2>Your published shelf is empty.</h2><p>Publish a comic to start tracking its readers and feedback.</p><button class="primary-button" id="emptyPublish">Publish a comic <span>+</span></button></div>'}</div>`;
  $("#creatorDashboard").querySelector("#emptyPublish")?.addEventListener("click", create);
  $("#creatorDashboard").querySelectorAll("[data-delete-book]").forEach((button) => {
    button.onclick = () => deletePublishedBook(button.dataset.deleteBook);
  });
}
async function deletePublishedBook(id) {
  const book = state.creatorBooks.find((item) => item.id === id);
  if (!book || !window.confirm(`Delete ${book.title}? This removes its ratings, reads, and comments.`)) return;
  const response = await fetch(`/api/me/books/${encodeURIComponent(id)}`, { method: "DELETE", credentials: "same-origin" });
  const result = await responseData(response);
  if (!response.ok) return toast(result.error || "Could not delete the book.");
  state.creatorBooks = state.creatorBooks.filter((item) => item.id !== id);
  comics = comics.filter((item) => item.id !== id);
  delete state.bookStats[id];
  state.bookmarks = state.bookmarks.filter((item) => item !== id);
  save();
  render();
  toast(`${book.title} was deleted`);
}
function card(c) {
  const saved = state.bookmarks.includes(c.id);
  const imagePath = c.image.startsWith("/") ? c.image : `${covers}${c.image}`;
  const stats = state.bookStats[c.id] || { views: 0, ratingTotal: 0, ratingCount: 0 };
  const rating = stats.ratingCount ? (stats.ratingTotal / stats.ratingCount).toFixed(1) : "0.0";
  return `<article class="comic-card"><div class="cover-wrap" data-detail="${c.id}" role="button" tabindex="0" aria-label="Open ${c.title}"><img class="comic-cover" src="${imagePath}" alt="${c.title} cover"><button class="card-bookmark ${saved ? "saved" : ""}" data-bookmark="${c.id}" aria-label="Bookmark ${c.title}">${saved ? "Saved" : "Save"}</button></div><button class="card-title" data-detail="${c.id}"><h3>${c.title}</h3></button><div class="card-genre">${c.genre}</div><div class="card-stats"><span class="rating"><b>${rating}</b><small>rating</small></span><span><b>${stats.views || 0}</b><small>views</small></span><span><b>${stats.views || 0}</b><small>reads</small></span></div></article>`;
}
function renderContinue() {
  const progress = { sandman: "42%", spiderman: "68%" };
  const items = state.continueReading.map((id) => comics.find((comic) => comic.id === id)).filter(Boolean);
  $("#continueRow").innerHTML = items.length ? items.map((c) => `<article class="continue-card" data-detail="${c.id}" role="button" tabindex="0" aria-label="Continue reading ${c.title}"><img class="continue-cover" src="${covers}${c.image}" alt="${c.title}"><div class="continue-info"><span class="genre">GRAPHIC NOVEL</span><h3>${c.title}</h3><div class="progress-label"><span>Chapter 2</span><span>${progress[c.id] || "5%"}</span></div><div class="progress"><i style="width:${progress[c.id] || "5%"}"></i></div></div></article>`).join("") : '<p class="continue-empty">Start reading a book and it will appear here.</p>';
  const visible = state.view === "library" && !$("#searchInput").value;
  $("#continueRow").style.display = visible ? "grid" : "none";
  $("#continueRow").querySelectorAll("[data-detail]").forEach((item) => { item.onclick = () => detail(item.dataset.detail); item.onkeydown = (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); detail(item.dataset.detail); } }; });
}
function render() {
  document.body.dataset.view = state.view;
  const creatorView = state.view === "creator";
  let list = comics.filter((c) =>
      state.view === "bookmarks"
          ? state.bookmarks.includes(c.id)
          : state.view === "library"
            ? true
            : state.view === "trending"
              ? true
              : c.status === "new",
  );
  const q = $("#searchInput").value.toLowerCase();
  if (q)
    list = comics.filter((c) =>
      (c.title + c.creator + c.genre).toLowerCase().includes(q),
    );
  if (state.view === "trending")
    list = list.filter((c) => (state.bookStats[c.id]?.ratingCount || 0) > 0);
  if (state.view === "trending") list.sort((a, b) => (state.bookStats[b.id]?.ratingTotal / state.bookStats[b.id]?.ratingCount || 0) - (state.bookStats[a.id]?.ratingTotal / state.bookStats[a.id]?.ratingCount || 0));
  $("#viewEyebrow").textContent =
    state.view === "library"
      ? "YOUR LIBRARY"
      : state.view === "bookmarks"
        ? "SAVED FOR LATER"
        : creatorView
          ? "CREATOR STUDIO"
        : state.view.toUpperCase();
  $("#viewTitle").innerHTML =
    creatorView
      ? "Your published <em>stories.</em>"
      : state.view === "library"
      ? "Good stories, <em>great company.</em>"
      : state.view === "bookmarks"
        ? "Your saved <em>worlds.</em>"
        : state.view === "trending"
          ? "What readers are <em>loving.</em>"
          : "Fresh from the <em>press.</em>";
  $("#catalogTitle").textContent = q
    ? `Results for "${q}"`
    : state.view === "library"
      ? "Curated for you"
      : state.view === "trending"
        ? "Rising this week"
        : state.view === "new"
          ? "Just landed"
          : "Your bookmarks";
  $("#catalogSub").textContent = q
    ? "Titles, creators, and genres"
    : "Handpicked worlds from the Panel House community";
  let modeHero = {
    library: { pill: "EDITOR'S PICK", title: "The Sandman", description: "Dream, ruler of stories, returns to a world that forgot his name.", image: "img/SandMan.jpg", alt: "The Sandman cover" },
    trending: { pill: "MOST TALKED ABOUT", title: "Stories with<br><em>momentum.</em>", description: "See what the Panel House community is rating highest right now.", image: "img/monstress.jpg", alt: "Monstress cover" },
    new: { pill: "JUST LANDED", title: "Fresh ink,<br><em>new worlds.</em>", description: "The latest pages from creators who are just getting started.", image: "img/ultimate_spiderman.jpg", alt: "Ultimate Spider-Man cover" },
    bookmarks: { pill: "YOUR SHORTLIST", title: "Keep the good<br><em>ones close.</em>", description: "Your saved stories, waiting exactly where you left them.", image: "img/SandMan.jpg", alt: "The Sandman cover" },
  }[state.view] || { pill: "CREATOR STUDIO", title: "Your published<br><em>stories.</em>", description: "Track the response to every book you publish.", image: "img/SandMan.jpg", alt: "Creator studio" };
  if (state.view === "trending") {
    const highestRated = comics
      .map((comic) => ({ comic, stats: state.bookStats[comic.id] }))
      .filter(({ stats }) => stats?.ratingCount)
      .sort((a, b) => {
        const averageA = a.stats.ratingTotal / a.stats.ratingCount;
        const averageB = b.stats.ratingTotal / b.stats.ratingCount;
        return averageB - averageA || b.stats.ratingCount - a.stats.ratingCount;
      })[0]?.comic;
    if (highestRated) {
      modeHero = {
        pill: "HIGHEST RATED",
        title: highestRated.title,
        description: `${highestRated.desc} Readers are rating it highest right now.`,
        image: highestRated.image.startsWith("/") ? highestRated.image : `${covers}${highestRated.image}`,
        alt: `${highestRated.title} cover`,
      };
    }
  }
  $("#heroPill").textContent = modeHero.pill;
  $("#heroTitle").innerHTML = modeHero.title;
  $("#heroDescription").textContent = modeHero.description;
  $("#heroImage").src = modeHero.image;
  $("#heroImage").alt = modeHero.alt;
  $("#dashboardHero").hidden = creatorView || state.view === "bookmarks";
  $("#continueHeading").hidden = creatorView || state.view === "trending" || state.view === "new";
  $("#continueRow").hidden = creatorView;
  $("#catalogHeading").hidden = creatorView;
  grid.hidden = creatorView;
  $("#creatorDashboard").hidden = !creatorView;
  if (creatorView) renderCreatorDashboard();
  grid.innerHTML = list.length
    ? list.map(card).join("")
    : "<p>Nothing here yet. Find a story to make it yours.</p>";
  renderContinue();
  $("#bookmarkCount").textContent = state.bookmarks.length;
  $("#continueRow").style.display =
    state.view === "library" && !q ? "grid" : "none";
  document
    .querySelectorAll(".nav-item[data-view]")
    .forEach((b) =>
      b.classList.toggle("active", b.dataset.view === state.view),
    );
  bindCards();
}
function bindCards() {
  document.querySelectorAll("[data-bookmark]").forEach(
    (b) =>
      (b.onclick = (e) => {
        e.stopPropagation();
        const id = b.dataset.bookmark;
        state.bookmarks = state.bookmarks.includes(id)
          ? state.bookmarks.filter((x) => x !== id)
          : [...state.bookmarks, id];
        save();
        render();
        toast(
          state.bookmarks.includes(id)
            ? "Added to bookmarks"
            : "Removed from bookmarks",
        );
      }),
  );
  document.querySelectorAll("[data-detail]").forEach((b) => {
    b.onclick = () => detail(b.dataset.detail);
    b.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        detail(b.dataset.detail);
      }
    };
  });
}
function openModal(html, modalClass = "") {
  $("#pageViewer")?.remove();
  $("#modalBackdrop .modal").classList.toggle(
    "chapter-reader-modal",
    modalClass === "chapter-reader-modal",
  );
  $("#modalBody").innerHTML = html;
  $("#modalBackdrop").classList.remove("hidden");
}
function closeModal() {
  $("#pageViewer")?.remove();
  $("#modalBackdrop").classList.add("hidden");
  $("#modalBackdrop .modal").classList.remove("chapter-reader-modal");
}
function readChapterOne(id) {
  const comic = comics.find((item) => item.id === id);
  const chapter =
    chapters[id] ||
    (comic?.pages?.length ? { pages: comic.pages, uploaded: true } : null);
  if (!chapter || !comic) return;
  const { folder, pages } = chapter;
  const chapterTitle = comic.chapterTitle || "Chapter One";
  const safeChapterTitle = escapeHtml(chapterTitle);
  const pagePath = (page) =>
    chapter.uploaded
      ? page
      : `chapters/${encodeURIComponent(folder)}/${encodeURIComponent(page)}`;
  openModal(
    `<div class="chapter-reader"><header class="chapter-reader-header"><div><p class="eyebrow">${escapeHtml(chapterTitle.toUpperCase())}</p><h2>${comic.title}</h2><p>${pages.length} pages · Select a page to view at its original size</p></div><button class="outline-button" id="returnToBook" type="button">Back to book details</button></header><div class="chapter-pages">${pages
      .map(
        (page, index) =>
          `<figure class="chapter-page"><button class="chapter-page-open" type="button" data-page-index="${index}" aria-label="View page ${index + 1} larger"><img src="${pagePath(page)}" alt="${comic.title}, ${safeChapterTitle}, page ${index + 1}" loading="lazy" decoding="async"></button><figcaption>Page ${index + 1}</figcaption></figure>`,
      )
      .join("")}</div></div>`,
    "chapter-reader-modal",
  );
  const viewer = document.createElement("div");
  viewer.id = "pageViewer";
  viewer.className = "page-viewer";
  viewer.hidden = true;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.setAttribute("aria-label", `${comic.title} chapter page`);
  viewer.innerHTML =
    '<button class="page-viewer-close" type="button" aria-label="Close enlarged page">Close ×</button><img class="page-viewer-image" alt="">';
  document.body.append(viewer);
  const viewerImage = viewer.querySelector(".page-viewer-image");
  let activePageButton;
  document.querySelectorAll(".chapter-page-open").forEach((button) => {
    button.onclick = () => {
      activePageButton = button;
      const index = Number(button.dataset.pageIndex);
      viewerImage.src = pagePath(pages[index]);
      viewerImage.alt = `${comic.title}, ${chapterTitle}, page ${index + 1}`;
      viewer.hidden = false;
      viewer.querySelector(".page-viewer-close").focus();
    };
  });
  const closeViewer = () => {
    viewer.hidden = true;
    viewerImage.removeAttribute("src");
    activePageButton?.focus();
  };
  viewer.querySelector(".page-viewer-close").onclick = closeViewer;
  viewer.onclick = (event) => {
    if (event.target === viewer) closeViewer();
  };
  viewer.onkeydown = (event) => {
    if (event.key === "Escape") closeViewer();
  };
  $("#returnToBook").onclick = () => detail(id);
}
async function detail(id) {
  const c = comics.find((x) => x.id === id);
  if (!c) return;
  const imagePath = c.image.startsWith("/") ? c.image : `${covers}${c.image}`;
  const chapterTitle = c.chapterTitle || "Chapter One";
  const safeChapterTitle = escapeHtml(chapterTitle);
  const preview = `${c.desc} In this opening chapter, every quiet detail matters. The page turns slowly at first, then the world begins to answer back.`;
  let stats = { views: 0, ratingTotal: 0, ratingCount: 0 }, comments = [];
  try {
    const [viewResponse, commentResponse] = await Promise.all([
      fetch(`/api/books/${encodeURIComponent(id)}/view`, { method: "POST", credentials: "same-origin" }),
      fetch(`/api/books/${encodeURIComponent(id)}/comments`, { credentials: "same-origin" }),
    ]);
    if (viewResponse.ok) stats = (await viewResponse.json()).stats;
    if (commentResponse.ok) comments = (await commentResponse.json()).comments;
  } catch (error) {}
  openModal(`<div class="detail-modal"><img src="${imagePath}" alt="${c.title} cover"><div class="detail-copy"><p class="eyebrow">${c.genre.toUpperCase()}</p><h2>${c.title}</h2><p class="detail-meta">By ${c.creator}<br>Rating ${stats.ratingCount ? (stats.ratingTotal / stats.ratingCount).toFixed(1) : "0.0"} | Views ${stats.views || 0} | Reads ${stats.views || 0}</p><div class="rating-control ${stats.hasRated ? "rating-complete" : ""}" data-stars="${id}" aria-label="Rate ${c.title}">${[1,2,3,4,5].map((value) => `<button type="button" data-rating="${value}" aria-label="Rate ${value} out of 5" ${stats.hasRated ? "disabled" : ""}>${value}</button>`).join("")}</div><p class="rating-note">${stats.hasRated ? "You have already rated this book." : "Choose one rating."}</p><button class="primary-button read-detail">Read ${safeChapterTitle} <span>-></span></button></div></div><section class="reader-preview"><p class="eyebrow">${escapeHtml(chapterTitle.toUpperCase())}</p><p>${preview}</p></section><div class="comment-list"><strong>Reader notes</strong>${comments.map((x) => `<p class="comment"><strong>${x.name}</strong>${x.text}</p>`).join("") || '<p class="comment">Be the first to leave a thought.</p>'}<form id="commentForm"><div class="form-field"><label for="commentText">Your comment</label><textarea id="commentText" maxlength="500" aria-label="Your comment" placeholder="Write your thoughts about this book..."></textarea></div><button class="outline-button" type="submit">Post comment</button></form></div>`);
  $(`[data-stars="${id}"]`).querySelectorAll("[data-rating]").forEach((button) => button.onclick = async () => { const rating = Number(button.dataset.rating); const response = await fetch(`/api/books/${encodeURIComponent(id)}/rating`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ rating }) }); if (response.ok) { const result = await responseData(response); state.bookStats[id] = result.stats; toast("Rating saved"); render(); detail(id); } else toast((await response.json()).error || "Could not save rating"); });
  $("#commentForm").onsubmit = async (e) => { e.preventDefault(); const text = $("#commentText").value.trim(); if (!text) return; try { const response = await fetch(`/api/books/${encodeURIComponent(id)}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ text }) }); const result = await responseData(response); if (response.ok) { toast("Comment posted"); detail(id); } else toast(result.error || "Could not post comment"); } catch (error) { toast("Could not reach the server. Please sign in again."); } };
  $(".read-detail").onclick = () => {
    if (!state.continueReading.includes(id)) state.continueReading.push(id);
    save();
    renderContinue();
    if (chapters[id]) {
      readChapterOne(id);
      return;
    }
    toast("Added to Continue reading");
  };
}
function auth() {
  openModal(
    `<h2>Switch account.</h2><p class="modal-intro">Sign in to switch to another Panel House account.</p><div class="auth-tabs"><button class="auth-tab active" data-auth="signin">Sign in</button><button class="auth-tab" data-auth="signup">Create account</button></div><form id="authForm"><div class="form-field auth-username-field" hidden><label>Username</label><input name="username" minlength="3" maxlength="20" pattern="[A-Za-z0-9_]+" placeholder="your_username"></div><div class="form-field"><label>Email</label><input name="email" type="email" required placeholder="you@example.com"></div><div class="form-field"><label>Password</label><input name="password" type="password" required placeholder="6+ characters"></div><p class="auth-error"></p><button class="primary-button form-submit" type="submit">Continue <span>Go</span></button></form>`,
  );
  let mode = "signin";
  document.querySelectorAll("[data-auth]").forEach(
    (t) =>
      (t.onclick = () => {
        document
          .querySelectorAll("[data-auth]")
          .forEach((x) => x.classList.remove("active"));
        t.classList.add("active");
        mode = t.dataset.auth;
        $(".auth-username-field").hidden = mode !== "signup";
        $(".auth-username-field input").required = mode === "signup";
        $("#authForm .form-submit").innerHTML = mode === "signup" ? "Create account <span>Go</span>" : "Continue <span>Go</span>";
      }),
  );
  $("#authForm").onsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(Object.fromEntries(new FormData($("#authForm")))) });
    const result = await responseData(response);
    if (!response.ok) return $("#authForm .auth-error").textContent = result.error || "Could not switch account.";
    applyUser(result);
    await loadPersonalState();
    await loadPublishedBooks();
    save();
    closeModal();
    render();
    toast("You are signed in as " + state.user);
  };
}
function create() {
  openModal(
    `<h2>Publish a comic.</h2><p class="modal-intro">Put your story in front of curious readers. It will appear in New releases.</p><form id="createForm"><div class="form-field"><label>Title</label><input id="newTitle" required placeholder="The title of your story"></div><div class="form-field"><label>Creator name</label><input id="newCreator" required placeholder="Your name or studio"></div><div class="form-field"><label>Genre</label><select id="newGenre"><option>Fantasy</option><option>Superhero</option><option>Sci-fi</option><option>Drama</option></select></div><div class="form-field"><label for="newChapterTitle">Chapter title</label><input id="newChapterTitle" required maxlength="80" value="Chapter One" placeholder="e.g. Chapter One"></div><div class="upload-fields"><div class="form-field"><label for="newImage">Cover image</label><input id="newImage" type="file" accept="image/jpeg,image/png,image/webp" required></div><div class="form-field"><label for="newPages">Upload chapter pages</label><input id="newPages" type="file" accept="image/jpeg,image/png,image/webp" multiple></div></div><button class="primary-button form-submit" type="submit">Publish to new releases <span>Publish</span></button></form>`,
  );
  $("#createForm").onsubmit = async (e) => {
    e.preventDefault();
    const file = $("#newImage").files[0];
    if (!file) return toast("Choose a cover image first");
    const pageFiles = [...$("#newPages").files];
    if (pageFiles.length > 50)
      return toast("Choose no more than 50 chapter pages.");
    const submit = $("#createForm .form-submit");
    submit.disabled = true;
    submit.textContent = "Uploading…";
    try {
      const uploadFile = async (uploadFile) => {
        const data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error(`Could not read ${uploadFile.name}.`));
          reader.readAsDataURL(uploadFile);
        });
        const response = await fetch("/api/uploads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ data }),
        });
        const result = await responseData(response);
        if (!response.ok) throw new Error(result.error || `Could not upload ${uploadFile.name}.`);
        return result.path;
      };
      const image = await uploadFile(file);
      const pages = [];
      for (const page of pageFiles) pages.push(await uploadFile(page));
      const publishResponse = await fetch("/api/me/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          title: $("#newTitle").value,
          creator: $("#newCreator").value,
          genre: $("#newGenre").value,
          chapterTitle: $("#newChapterTitle").value,
          image,
          pages,
        }),
      });
      const publishResult = await responseData(publishResponse);
      if (!publishResponse.ok)
        throw new Error(publishResult.error || "Could not publish the book.");
      const c = { ...publishResult.book, status: "new", published: true };
      comics.unshift(c);
      state.creatorBooks.unshift(publishResult.book);
      closeModal();
      state.view = "creator";
      render();
      toast(c.title + " is now published");
    } catch (error) {
      toast(error.message || "Could not upload the comic.");
    } finally {
      if ($("#createForm .form-submit")) {
        $("#createForm .form-submit").disabled = false;
        $("#createForm .form-submit").innerHTML =
          'Publish to new releases <span>Publish</span>';
      }
    }
  };
}
$("#modalClose").onclick = closeModal;
$("#modalBackdrop").onclick = (e) => {
  if (e.target === $("#modalBackdrop")) closeModal();
};
document.querySelectorAll(".nav-item[data-view]").forEach(
  (b) =>
    (b.onclick = () => {
      state.view = b.dataset.view;
      render();
      if (state.view === "creator") loadPublishedBooks();
    }),
);
$("#createNav").onclick = create;
$("#profileButton").onclick = auth;
$("#signOutButton").onclick = async () => {
  await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
  localStorage.removeItem("ph-user");
  state.user = "";
  state.bookmarks = [];
  state.continueReading = [];
  document.body.classList.add("auth-locked");
  document.querySelector("#authGate")?.remove();
  showAuthGate();
  toast("You have been signed out");
};
$("#searchInput").oninput = render;
$("#seeAll").onclick = () => {
  state.view = "library";
  render();
};
$("#heroRead").onclick = () => detail("sandman");
$("#continueRow").innerHTML = [
  ["SAGA", "SAGA.jpg", "64%"],
  ["Monstress", "monstress.jpg", "32%"],
  ["Paper Girls", "paper_girls.jpg", "81%"],
]
  .map(
    (x) =>
      `<article class="continue-card"><img class="continue-cover" src="${covers}${x[1]}" alt="${x[0]}"><div class="continue-info"><span class="genre">GRAPHIC NOVEL</span><h3>${x[0]}</h3><div class="progress-label"><span>Chapter 2</span><span>${x[2]}</span></div><div class="progress"><i style="width:${x[2]}"></i></div></div></article>`,
  )
  .join("");
render();
const savedTheme = localStorage.getItem("ph-theme") || "light";
document.body.classList.toggle("theme-dark", savedTheme === "dark");
const themeButton = document.createElement("button");
themeButton.className = "theme-toggle";
themeButton.type = "button";
themeButton.setAttribute("aria-label", "Toggle dark mode");
themeButton.setAttribute("aria-pressed", savedTheme === "dark");
themeButton.innerHTML = '<span class="theme-icon sun-icon" aria-hidden="true"></span><span class="theme-icon moon-icon" aria-hidden="true"></span><span class="theme-thumb" aria-hidden="true"></span>';
document.querySelector(".top-actions").prepend(themeButton);
themeButton.onclick = () => {
  const dark = !document.body.classList.contains("theme-dark");
  document.body.classList.toggle("theme-dark", dark);
  themeButton.setAttribute("aria-pressed", dark);
  localStorage.setItem("ph-theme", dark ? "dark" : "light");
};
const coverStyle = document.createElement("style");
coverStyle.textContent =
  ".theme-dark{--ink:#e4e2dc;--paper:#111416;--muted:#a7aaa8;--line:#3b4042;--white:#2a2e31;--surface:#2a2e31;--surface-soft:#303538}.theme-dark .topbar{background:#111416}.theme-dark .search-box{background:var(--surface-soft)}.theme-dark .continue-card,.theme-dark .outline-button{background:var(--surface)}.theme-dark .comic-card h3,.theme-dark .section-heading h2,.theme-dark .page-heading h1{color:var(--ink)}.theme-dark .comic-cover{filter:saturate(.82) brightness(.9)}.theme-dark .cover-wrap{box-shadow:0 12px 22px #10121499}.cover-wrap{aspect-ratio:2/3;height:auto;box-shadow:0 12px 22px #29291d1c;border-radius:2px}.comic-cover{object-position:center top}";
document.head.append(coverStyle);

const authStyle = document.createElement("style");
authStyle.textContent =
  '.auth-locked .app-shell{display:none}.auth-gate{min-height:100vh;background:#121312;display:grid;grid-template-columns:minmax(280px,1fr) minmax(320px,480px);color:#f5f3ed}.auth-art{background:linear-gradient(90deg,#121312cc,#12131233),url("img/SandMan.jpg") center/cover;min-height:100vh}.auth-panel{background:#f5f3ed;color:#121312;padding:clamp(34px,7vw,90px);display:flex;flex-direction:column;justify-content:center}.auth-brand{font:700 22px "Space Grotesk";margin-bottom:auto}.auth-brand b{display:inline-grid;background:#e85d2a;color:#121312;width:27px;height:27px;place-items:center;margin-right:8px;transform:rotate(-8deg)}.auth-panel h1{font:600 clamp(30px,4vw,48px)/1.02 "Space Grotesk";letter-spacing:-2px;margin:0 0 12px}.auth-panel h1 em{font-style:normal;color:#77786f;font-weight:500}.auth-copy{color:#797a73;font-size:12px;line-height:1.6;margin:0 0 27px}.auth-mode{display:flex;border-bottom:1px solid #deddd5;margin-bottom:24px}.auth-mode button{padding:10px 16px 12px;font-size:12px;color:#797a73}.auth-mode button.active{border-bottom:2px solid #e85d2a;color:#121312;font-weight:700}.auth-gate-form{display:grid;gap:14px}.auth-gate-form label{font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:700}.auth-gate-form input{display:block;width:100%;border:1px solid #deddd5;background:#fffdf8;padding:13px;margin-top:7px;outline:0;font-size:12px}.auth-gate-submit{background:#e85d2a;padding:13px;font-weight:700;font-size:12px;margin-top:4px}.auth-error{min-height:16px;color:#b34226;font-size:11px;margin:0}.auth-note{color:#797a73;font-size:10px;margin-top:auto}@media(max-width:680px){.auth-gate{display:block}.auth-art{display:none}.auth-panel{min-height:100vh;padding:30px 25px}.auth-brand{margin-bottom:18vh}.auth-note{margin-top:40px}}';
document.head.append(authStyle);
function showAuthGate() {
  const gate = document.createElement("section");
  gate.className = "auth-gate";
  gate.id = "authGate";
  gate.innerHTML =
    '<div class="auth-art"></div><div class="auth-panel"><div class="auth-brand"><b>P</b>panelhouse</div><div><p class="eyebrow">YOUR COMIC UNIVERSE</p><h1>Good stories,<br><em>great company.</em></h1><p class="auth-copy">Find your next favorite world, follow independent creators, and keep every chapter close.</p><div class="auth-mode"><button class="active" data-mode="signin">Sign in</button><button data-mode="signup">Create account</button></div><form class="auth-gate-form"><label class="username-field" hidden>Username<input type="text" name="username" minlength="3" maxlength="20" pattern="[A-Za-z0-9_]+" placeholder="your_username"></label><label>Email<input type="email" name="email" required placeholder="you@example.com"></label><label>Password<input type="password" name="password" minlength="6" required placeholder="6+ characters"></label><p class="auth-error"></p><button class="auth-gate-submit" type="submit">Continue <span>-></span></button></form></div><p class="auth-note">A quiet place for loud ideas.</p></div>';
  document.body.prepend(gate);
  let mode = "signin";
  const form = gate.querySelector("form"),
    error = gate.querySelector(".auth-error");
  gate.querySelectorAll("[data-mode]").forEach(
    (button) =>
      (button.onclick = () => {
        mode = button.dataset.mode;
        form.querySelector(".username-field").hidden = mode !== "signup";
        form.querySelector("[name=username]").required = mode === "signup";
        gate
          .querySelectorAll("[data-mode]")
          .forEach((item) => item.classList.toggle("active", item === button));
        form.querySelector(".auth-gate-submit").innerHTML =
          mode === "signin"
            ? "Continue <span>-></span>"
            : "Create account <span>-></span>";
      }),
  );
  form.onsubmit = async (event) => {
    event.preventDefault();
    error.textContent = "";
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/auth/" + mode, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(data),
      });
      const result = await responseData(response);
      if (!response.ok) throw new Error(result.error);
      applyUser(result);
      await loadPersonalState();
      await loadPublishedBooks();
      save();
      gate.remove();
      document.body.classList.remove("auth-locked");
      toast("Welcome to Panel House, " + state.user);
    } catch (requestError) {
      error.textContent =
        requestError.message === "Failed to fetch"
          ? "Start the backend with npm start, then reload this page."
          : requestError.message;
    }
  };
}
async function bootAuth() {
  try {
    const response = await fetch("/api/me", { credentials: "same-origin" });
    if (response.ok) {
      const result = await responseData(response);
      applyUser(result);
      await loadPersonalState();
      document.body.classList.remove("auth-locked");
      return;
    }
  } catch (error) {}
  showAuthGate();
}
bootAuth();
async function loadBookStats() {
  try {
    const response = await fetch("/api/books/stats", { credentials: "same-origin" });
    if (!response.ok) return;
    const result = await responseData(response);
    state.bookStats = Object.fromEntries(result.stats.map((item) => [item.bookId, item]));
    render();
  } catch (error) {}
}
render();
loadBookStats();
loadPublishedBooks();
