// Main Entry Point - ES6 Modules
import { createObserver, forceScrollReset } from './utils.js';
import { 
  initTypingEffect, 
  initParticles, 
  initAOS, 
  initFadeInSections,
  initWhatIDoAnimation 
} from './animations.js';
import { 
  initHeader, 
  initMobileMenu, 
  initScrollProgress,
  initCertModal,
  initStickyCTA,
  initBackToTop,
  hideLoadingScreen,
  initModalEscapeHandler
} from './ui.js';

// Scroll Animation Observer
const observer = createObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

// Force scroll to top on page load
forceScrollReset();

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', forceScrollReset);
window.addEventListener('load', forceScrollReset);

// Initialize on page load
hideLoadingScreen();
initScrollProgress();
initHeader();
initMobileMenu();
initTypingEffect();
initParticles();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  forceScrollReset();
  
  initAOS();
  initWhatIDoAnimation(observer);
  initFadeInSections();
  initCertModal();
  initStickyCTA();
  initBackToTop();
  initModalEscapeHandler();
});
