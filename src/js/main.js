// Function to handle the navigation and audio fade
function handleYesClick(button) {
  const audio = document.getElementById('bgAudio');

  // 1. Smooth volume increase with safety clamping
  if (audio) {
    let vol = audio.volume;
    const fade = setInterval(() => {
      // Clamping ensures volume never goes above 0.6 or below 0
      vol = Math.min(Math.max(vol + 0.02, 0), 0.6); 
      audio.volume = vol;

      if (vol >= 0.6) {
        clearInterval(fade);
      }
    }, 100);
  }

  // 2. Button animation
  button.style.transform = 'scale(.98)';
  setTimeout(() => {
    button.style.transition = 'opacity .45s ease, transform .35s ease';
    button.style.opacity = '0';
    button.style.transform = 'translateY(-8px) scale(.98)';

    // 3. SPA Navigation
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('spa:navigate', { 
        detail: { href: 'thank-you.html' } 
      }));
    }, 420);
  }, 80);
}

// Global Click Listener (Remains the same)
document.addEventListener('click', (e) => {
  const yesBtn = e.target.closest('#yes-button');
  if (yesBtn) {
    e.preventDefault();
    handleYesClick(yesBtn);
  }
});

// Audio setup (Remains the same)
function initAudio() {
  const audio = document.getElementById('bgAudio');
  if (!audio) return;
  audio.volume = 0.02;
}

document.addEventListener('DOMContentLoaded', initAudio);