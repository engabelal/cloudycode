// Utility Functions Module

// Focus Trap for Modals
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  return firstFocusable;
}

// Intersection Observer Factory
export function createObserver(callback, options = {}) {
  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Debounce Function
export function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Scroll to Top
export function scrollToTop(behavior = 'smooth') {
  window.scrollTo({
    top: 0,
    behavior
  });
}

// Force Scroll Reset
export function forceScrollReset() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}
