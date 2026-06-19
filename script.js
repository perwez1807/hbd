// Floating hearts background
const heartsContainer = document.getElementById('hearts');
const heartCount = 18;

for (let i = 0; i < heartCount; i++) {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = ['♥', '❀', '♡'][Math.floor(Math.random() * 3)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (14 + Math.random() * 18) + 'px';
  h.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  h.style.animationDuration = (8 + Math.random() * 10) + 's';
  h.style.animationDelay = (Math.random() * 10) + 's';
  heartsContainer.appendChild(h);
}

const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');
const dodgeMsg = document.getElementById('dodgeMsg');
const yesScreen = document.getElementById('yesScreen');

const messages = [
  "nice try.",
  "nope, can't catch this one.",
  "getting warmer... or colder?",
  "it's not going to happen 😌",
  "you're persistent, I like that.",
  "okay but the answer is still yes-only.",
  "I'll just keep moving forever.",
  "this button has trust issues.",
  "just click yes already 💛",
];
let dodgeCount = 0;

function moveNoButton() {
  const btnRect = noBtn.getBoundingClientRect();
  const margin = 16;
  const maxX = window.innerWidth - btnRect.width - margin;
  const maxY = window.innerHeight - btnRect.height - margin;
  const newX = Math.max(margin, Math.random() * maxX);
  const newY = Math.max(margin, Math.random() * maxY);

  if (!noBtn.classList.contains('fixed-pos')) {
    noBtn.classList.add('fixed-pos');
  }

  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';

  dodgeCount++;
  const msg = messages[Math.min(dodgeCount - 1, messages.length - 1)];
  dodgeMsg.textContent = msg;
  dodgeMsg.classList.add('show');

  // grow the Yes button slightly each time, just for fun
  const scale = Math.min(1 + dodgeCount * 0.04, 1.6);
  yesBtn.style.transform = `scale(${scale})`;
}

// Desktop: dodge on hover/mouse approach
noBtn.addEventListener('mouseenter', moveNoButton);

// Mobile / fallback: dodge on touchstart and click
noBtn.addEventListener('touchstart', function (e) {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

noBtn.addEventListener('click', function (e) {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener('click', function () {
  yesScreen.classList.add('show');
});

window.addEventListener('resize', function () {
  if (noBtn.classList.contains('fixed-pos')) {
    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - 16;
    const maxY = window.innerHeight - rect.height - 16;
    noBtn.style.left = Math.min(parseFloat(noBtn.style.left), maxX) + 'px';
    noBtn.style.top = Math.min(parseFloat(noBtn.style.top), maxY) + 'px';
  }
});
