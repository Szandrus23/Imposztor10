const wordPairs = [
  ["nap", "ég"],
  ["iskola", "tanulás"],
  ["pizza", "sajt"],
  ["kutya", "ugat"],
  ["hó", "hideg"],
  ["alma", "gyümölcs"],
  ["foci", "labda"],
  ["bicikli", "kerek"],
  ["tél", "kabát"],
  ["víz", "szomj"],
  ["vonat", "sín"],
  ["cukor", "édes"],
  ["ház", "tető"],
  ["bolt", "vásárlás"],
  ["repülő", "szárny"],
  ["autó", "kerék"],
  ["mozi", "film"],
  ["erdő", "fa"],
  ["kenyér", "szelet"],
  ["táska", "cipzár"],
  // Bővíthető tovább több ezer szóig...
];

let players = [];
let currentIndex = 0;
let impostorIndex = null;
let word = "";
let fakeWord = "";

function startGame() {
  const namesInput = document.getElementById("names").value.trim();
  if (!namesInput) return alert("Adj meg legalább 2 nevet!");

  players = namesInput.split(",").map(n => n.trim()).filter(n => n !== "");
  if (players.length < 3) return alert("Legalább 3 játékos kell!");

  document.getElementById("player-input").classList.add("hidden");
  document.getElementById("player-list").classList.remove("hidden");
  document.getElementById("word-display").classList.remove("hidden");

  const ul = document.getElementById("players");
  players.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  });

  const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
  word = pair[0];
  fakeWord = pair[1];
  impostorIndex = Math.floor(Math.random() * players.length);

  showCurrentPlayer();
}

function showCurrentPlayer() {
  document.getElementById("word").classList.add("hidden");
  document.getElementById("next-button").classList.add("hidden");
  document.getElementById("current-player-name").textContent = `${players[currentIndex]} következik – csak ő nézze!`;
}

function revealWord() {
  let displayedText = "";
  if (currentIndex === impostorIndex) {
    displayedText = `Szavad: ${fakeWord} – 🕵️‍♂️ Te vagy az imposztor!`;
  } else {
    displayedText = `Szavad: ${word}`;
  }
  document.getElementById("word").textContent = displayedText;
  document.getElementById("word").classList.remove("hidden");
  document.getElementById("next-button").classList.remove("hidden");
}

function nextPlayer() {
  currentIndex++;
  if (currentIndex >= players.length) {
    document.getElementById("word-display").classList.add("hidden");
    document.getElementById("reveal-impostor").classList.remove("hidden");
  } else {
    showCurrentPlayer();
  }
}

function revealImpostor() {
  const name = players[impostorIndex];
  document.getElementById("impostor-result").textContent = `Az imposztor: ${name}`;
  document.getElementById("reveal-impostor").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
}
