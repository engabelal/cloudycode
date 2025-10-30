// Keyboard Navigation Focus Highlighter
(function() {
  let isKeyboardUser = false;

  // Detect keyboard usage
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-nav');
    }
  });

  // Detect mouse usage
  document.addEventListener('mousedown', () => {
    isKeyboardUser = false;
    document.body.classList.remove('keyboard-nav');
  });

  // Enhanced focus styles for keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    body.keyboard-nav *:focus {
      outline: 3px solid #a362ff !important;
      outline-offset: 3px !important;
      box-shadow: 0 0 0 6px rgba(163, 98, 255, 0.2) !important;
    }

    body.keyboard-nav a:focus,
    body.keyboard-nav button:focus {
      outline: 3px solid #a362ff !important;
      outline-offset: 3px !important;
      box-shadow: 0 0 0 6px rgba(163, 98, 255, 0.3) !important;
    }
  `;
  document.head.appendChild(style);
})();
