// initialize page-specific interactions when a fragment is injected or page loads
window.onFragmentLoaded = window.onFragmentLoaded || function onFragmentLoaded() {
  const yes = document.getElementById('yes-button');
  const thankLink = document.getElementById('thankLink');

  if (!yes) return;

  // attach a single handler (idempotent)
  yes.removeEventListener('click', yes._loveHandler);
  yes._loveHandler = function (e) {
    e.preventDefault();

    // tiny press animation
    yes.style.transform = 'scale(.98)';
    setTimeout(() => {
      yes.style.transition = 'opacity .45s ease, transform .35s ease';
      yes.style.opacity = '0';
      yes.style.transform = 'translateY(-8px) scale(.98)';
      setTimeout(() => {
        // Preferred: emit SPA event so shell handles the navigation reliably
        if (window && typeof window.dispatchEvent === 'function') {
          try {
            window.dispatchEvent(new CustomEvent('spa:navigate', { detail: { href: 'thank-you.html' } }));
            // safety fallback: if SPA didn't navigate after a brief moment, do a hard redirect
            setTimeout(() => {
              if (!location.pathname.includes('thank-you')) {
                location.href = 'thank-you.html';
              }
            }, 500);
            return;
          } catch (err) {
            // fall through to anchor/fallback
            console.warn('spa:navigate dispatch failed, falling back', err);
          }
        }

        // fallback: trigger hidden anchor if present
        if (thankLink) {
          try {
            thankLink.click();
            setTimeout(() => {
              if (!location.pathname.includes('thank-you')) {
                location.href = 'thank-you.html';
              }
            }, 500);
            return;
          } catch (err) {
            console.warn('thankLink click failed, falling back to location.href', err);
          }
        }

        // final fallback: full navigation
        location.href = 'thank-you.html';
      }, 420);
    }, 80);
  };
  yes.addEventListener('click', yes._loveHandler);
};

// run on initial load (when page is loaded standalone)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.onFragmentLoaded === 'function') {
    try { window.onFragmentLoaded(); } catch(e) {}
  }
});

window.onFragmentLoaded = function () {
  const noBtn = document.getElementById('no-button');
  const container = document.querySelector('.container');
  if (!noBtn || !container) return;

  const phrases = [
    "Bold of you to try 😅",
    "Don't do this 😭",
    "Hey hey, wrong choice 👀",
    "Nice try 😜",
    "Ah ah, nope 😏",
    "Oops… try again 😅",
    "Eii please 😭",
    "Why are you like this 😂",
    "You know you want to 😌",
    "We both know the answer 😌",
    "Nice attempt though 👏",
    "The universe says YES 🌍"
  ];

  let dodgeCount = 0;
  let lastPhrase = -1;

  function pickPhrase() {
    let i;
    do { i = Math.floor(Math.random() * phrases.length); }
    while (i === lastPhrase);
    lastPhrase = i;
    return phrases[i];
  }

  function moveAway(e) {
    const rect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = rect.width - btnRect.width - 10;
    const maxY = rect.height - btnRect.height - 10;

    noBtn.style.position = 'absolute';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
    noBtn.textContent = pickPhrase();
  }

  ['mouseenter','pointerenter','touchstart','mousedown'].forEach(evt => {
    noBtn.addEventListener(evt, (e) => {
      e.preventDefault();
      moveAway(e);
    }, { passive:false });
  });

  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveAway(e);
  });
};
