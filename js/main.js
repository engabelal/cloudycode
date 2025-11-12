// Main Entry Point - ES6 Modules
import { createObserver, forceScrollReset } from './utils.js';
import { 
  initTypingEffect, 
  initParticles, 
  initAOS, 
  initFadeInSections,
  initWhatIDoAnimation,
  IMAGE_ERROR_RECHECK_DELAY
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
import { 
  initGlobalErrorHandler,
  initImageErrorHandlers,
  initNetworkMonitor
} from './error-handler.js';
import { initPWA, initSWUpdateNotification } from './pwa.js';

// Scroll Animation Observer
const observer = createObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});

// Initialize error handling first
initGlobalErrorHandler();
initNetworkMonitor();

// Initialize PWA features
initPWA();
initSWUpdateNotification();

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
initImageErrorHandlers();

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
  
  // Re-check images after DOM is fully loaded
  setTimeout(initImageErrorHandlers, IMAGE_ERROR_RECHECK_DELAY);
});
