// ===== Floating background emojis =====
const floatContainer = document.getElementById('floatContainer');
const emojis = ['💛', '🫂', '❤️', '🦋', '✨', '🌸', '🎀'];

function spawnFloaty() {
  const el = document.createElement('span');
  el.className = 'floaty';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const duration = 8 + Math.random() * 8;
  el.style.animationDuration = duration + 's';
  el.style.fontSize = (16 + Math.random() * 16) + 'px';
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), duration * 1000);
}

setInterval(spawnFloaty, 700);
for (let i = 0; i < 8; i++) setTimeout(spawnFloaty, i * 300);

// ===== Gallery scroll reveal =====
const photoCards = document.querySelectorAll('.photo-card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

photoCards.forEach(card => observer.observe(card));

// ===== Envelope open / letter reveal =====
const envelope = document.getElementById('envelope');
const letterPaper = document.getElementById('letterPaper');
const letterLines = document.querySelectorAll('.letter-line');

envelope.addEventListener('click', openLetter);

function openLetter() {
  envelope.classList.add('hidden');
  letterPaper.classList.add('visible');
  document.querySelector('.letter-wrap').classList.add('opened');

  letterLines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('reveal');
    }, 300 + i * 450);
  });

  // little confetti burst of hearts on open
  for (let i = 0; i < 18; i++) {
    setTimeout(() => spawnBurstHeart(), i * 60);
  }
}

function spawnBurstHeart() {
  const el = document.createElement('span');
  el.className = 'floaty';
  el.textContent = ['❤️', '💛', '🫂', '✨'][Math.floor(Math.random() * 4)];
  el.style.left = 50 + (Math.random() * 40 - 20) + 'vw';
  el.style.top = '40vh';
  el.style.animationDuration = '4s';
  el.style.fontSize = (18 + Math.random() * 14) + 'px';
  floatContainer.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ===== Auto-open letter if it's already scrolled into view and idle (optional nudge) =====
const letterSection = document.querySelector('.letter-section');
let nudged = false;
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !nudged) {
      nudged = true;
      // gentle pulse already handled by CSS animation
    }
  });
}, { threshold: 0.5 });
letterObserver.observe(letterSection);
