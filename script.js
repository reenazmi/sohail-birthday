const startDate = new Date("2022-05-06T00:00:00");
const daysEl = document.getElementById("daysTogether");

function updateCounter() {
  const now = new Date();
  const ms = Math.max(0, now - startDate);
  const days = Math.floor(ms / 86400000);
  const years = Math.floor(days / 365.2425);
  const remaining = days - Math.floor(years * 365.2425);
  daysEl.textContent = `${days.toLocaleString()} days • ${years} year${years !== 1 ? "s" : ""} & ${Math.max(0, remaining)} days`;
}
updateCounter();
setInterval(updateCounter, 60000);

const modal = document.getElementById("messageModal");
const letterModal = document.getElementById("letterModal");
const modalMessage = document.getElementById("modalMessage");

function openMessage(message) {
  modalMessage.textContent = message;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  burstHearts();
}
function closeModals() {
  [modal, letterModal].forEach(m => {
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
  });
}
document.querySelectorAll("[data-message]").forEach(el => {
  el.addEventListener("click", () => openMessage(el.dataset.message));
});
document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModals));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModals(); });

document.getElementById("openLetter").addEventListener("click", () => {
  letterModal.classList.add("open");
  letterModal.setAttribute("aria-hidden", "false");
  burstHearts();
});

document.getElementById("secretBtn").addEventListener("click", () => {
  openMessage("Sohail, if there is one thing I want you to remember: I don't need a perfect story. I want a real one — with patience, laughter, duas, food, silly arguments, forgiveness and a home that feels peaceful. Happy birthday, my love. ♡");
});

function burstHearts() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const h = document.createElement("span");
      h.className = "floating-heart";
      h.textContent = ["♡","♥","✦"][Math.floor(Math.random()*3)];
      h.style.left = `${40 + Math.random()*20}vw`;
      h.style.top = `${48 + Math.random()*10}vh`;
      h.style.setProperty("--drift", `${(Math.random()-.5)*180}px`);
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }, i*80);
  }
}

// Soft tap/click sparkle effect.
document.addEventListener("click", e => {
  if (e.target.closest("button,a")) {
    const s = document.createElement("span");
    s.className = "floating-heart";
    s.textContent = "♡";
    s.style.left = `${e.clientX}px`;
    s.style.top = `${e.clientY}px`;
    s.style.setProperty("--drift", `${(Math.random()-.5)*80}px`);
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2800);
  }
});

// Music button is intentionally a toggle placeholder because browsers block
// autoplay and no copyrighted audio file was supplied. Add your own music.mp3
// beside index.html and this button will use it.
let audio;
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", () => {
  if (!audio) {
    audio = new Audio("music.mp3");
    audio.loop = true;
  }
  if (audio.paused) {
    audio.play().then(() => {
      musicBtn.innerHTML = "❚❚ <span>Music</span>";
    }).catch(() => {
      alert("Add a file named music.mp3 to this folder, then tap Music again.");
    });
  } else {
    audio.pause();
    musicBtn.innerHTML = "♫ <span>Music</span>";
  }
});
