function showStep(id){
  document.querySelectorAll(".step").forEach(s => s.classList.remove("step--active"));
  document.getElementById(id).classList.add("step--active");
}

/* ---------------- Music ---------------- */
const bgMusic = document.getElementById("bgMusic");
const musicOnBtn = document.getElementById("musicOnBtn");
const musicSkipBtn = document.getElementById("musicSkipBtn");

if (bgMusic) {
  bgMusic.volume = 0.6;
}

/* ---------------- Envelope ---------------- */
const envelope = document.getElementById("envelope");
const sealBtn = document.getElementById("sealBtn");

sealBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  setTimeout(() => showStep("step-music"), 950);
});

musicOnBtn?.addEventListener("click", async () => {
  try {
    await bgMusic?.play();
  } catch (_) {}
  showStep("step-question");
});

musicSkipBtn?.addEventListener("click", () => {
  showStep("step-question");
});

/* ---------------- Yes / No ---------------- */
const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => showStep("step-yes"));

function dodgeNoButton(){
  const card = noBtn.closest(".card");
  const cardRect = card.getBoundingClientRect();
  const btnRect  = noBtn.getBoundingClientRect();

  const padding = 18;
  const maxX = cardRect.width - btnRect.width - padding;
  const maxY = cardRect.height - btnRect.height - padding;

  const x = Math.max(padding, Math.random() * maxX);
  const y = Math.max(padding, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;
}

noBtn.addEventListener("mouseenter", dodgeNoButton);
noBtn.addEventListener("click", dodgeNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodgeNoButton();
}, { passive: false });

/* ---------------- Next buttons ---------------- */
document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => showStep(btn.dataset.next));
});

/* ---------------- Back buttons ---------------- */
document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showStep(btn.dataset.back));
});

/* ---------------- Moments Timeline (2023 = VIDEO) ---------------- */
const years = [2022, 2023, 2024, 2025];
let currentIndex = 0;

// Set your files here:
const media = {
  2022: { type: "image", src: "2022.jpg", caption: "Our first Valentine's Day together,beach date na sunog ang karne hehe." },
  2023: { type: "video", src: "2023.mp4", caption: "Too Broke, we end up beach date again but im so happy" },
  2024: { type: "image", src: "2024.jpg", caption: "Eduardo's na akala natin eh sobrang aesthetic pero nag enjoy ako, gamit pa natin tmx" },
  2025: { type: "image", src: "2025.jpg", caption: "away muna bago date hahaha, but end up a memorable valentine's with you, sobrang ganda mo mahal" }
};

const momentImg = document.getElementById("momentImg");
const momentVideo = document.getElementById("momentVideo");
const momentYear = document.getElementById("momentYear");
const momentCaption = document.getElementById("momentCaption");
const momentDots = document.getElementById("momentDots");

function renderMoment(){
  const year = years[currentIndex];
  momentYear.textContent = year;

  const item = media[year];
  momentCaption.textContent = item.caption || "";

  if(item.type === "image"){
    momentVideo.pause();
    momentVideo.removeAttribute("src");
    momentVideo.load();
    momentVideo.style.display = "none";

    momentImg.src = item.src;
    momentImg.style.display = "block";
  } else {
    momentImg.removeAttribute("src");
    momentImg.style.display = "none";

    momentVideo.src = item.src;
    momentVideo.style.display = "block";
    momentVideo.play().catch(() => {});
  }

  momentDots.innerHTML = "";
  years.forEach((_, i) => {
    const dot = document.createElement("span");
    if(i === currentIndex) dot.classList.add("active");
    momentDots.appendChild(dot);
  });
}

document.getElementById("prevMoment").onclick = () => {
  currentIndex = (currentIndex - 1 + years.length) % years.length;
  renderMoment();
};

document.getElementById("nextMoment").onclick = () => {
  currentIndex = (currentIndex + 1) % years.length;
  renderMoment();
};

renderMoment();

/* ---------------- Restart ---------------- */
const restartBtn = document.getElementById("restartBtn");
restartBtn?.addEventListener("click", () => {
  envelope.classList.remove("open");

  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";

  currentIndex = 0;
  renderMoment();

  showStep("step-envelope");
});
