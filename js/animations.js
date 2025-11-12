// Animations Module
import { safeExecute, isLibraryLoaded } from './error-handler.js';

// Animation Constants
const TYPING_CONFIG = {
  TYPE_SPEED: 50,
  DELETE_SPEED: 25,
  PAUSE_DURATION: 3000,
  NEXT_TEXT_DELAY: 500,
  INITIAL_DELAY: 1500
};

const PARTICLES_CONFIG = {
  PARTICLE_COUNT: 50,
  DENSITY_AREA: 800,
  MOVE_SPEED: 0.5,
  PARTICLE_SIZE: 3,
  OPACITY: 0.6
};

const AOS_CONFIG = {
  DURATION: 800,
  OFFSET: 100
};

const OBSERVER_CONFIG = {
  THRESHOLD: 0.3,
  ROOT_MARGIN: '0px'
};

export const IMAGE_ERROR_RECHECK_DELAY = 1000;

// Typing Effect
export function initTypingEffect() {
  return safeExecute(() => {
    const typedTextSpan = document.querySelector('.typed-text');
    if (!typedTextSpan) return;

  const texts = [
    'Structured, stable, and effortlessly alive',
    'Built for scale, designed for reliability',
    'Automated, resilient, and brilliantly efficient'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
      typedTextSpan.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(type, TYPING_CONFIG.TYPE_SPEED);
    } else if (isDeleting && charIndex > 0) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, TYPING_CONFIG.DELETE_SPEED);
    } else if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, TYPING_CONFIG.PAUSE_DURATION);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, TYPING_CONFIG.NEXT_TEXT_DELAY);
    }
  }

    setTimeout(type, TYPING_CONFIG.INITIAL_DELAY);
  }, null, 'Typing Effect');
}

// Particles.js Configuration
export function initParticles() {
  if (!isLibraryLoaded('particlesJS')) {
    console.warn('Particles.js not loaded, skipping animation');
    return;
  }
  
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Particles disabled due to prefers-reduced-motion');
    return;
  }
  
  return safeExecute(() => {

  particlesJS('particles-js', {
    particles: {
      number: {
        value: PARTICLES_CONFIG.PARTICLE_COUNT,
        density: {
          enable: true,
          value_area: PARTICLES_CONFIG.DENSITY_AREA
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: PARTICLES_CONFIG.OPACITY,
        random: true
      },
      size: {
        value: PARTICLES_CONFIG.PARTICLE_SIZE,
        random: true
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: PARTICLES_CONFIG.MOVE_SPEED,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: false
        },
        onclick: {
          enable: false
        },
        resize: true
      }
    },
    retina_detect: true
    });
  }, null, 'Particles.js');
}

// AOS Initialization
export function initAOS() {
  if (!isLibraryLoaded('AOS')) {
    console.warn('AOS library not loaded, skipping animations');
    return;
  }
  
  return safeExecute(() => {

  AOS.init({
    duration: AOS_CONFIG.DURATION,
    easing: 'ease-out',
    once: true,
    offset: AOS_CONFIG.OFFSET,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }, null, 'AOS');
}

// Fade-in Sections Observer
export function initFadeInSections() {
  return safeExecute(() => {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
  
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Lazy load images in section
          const lazyImages = entry.target.querySelectorAll('img[data-src]');
          lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          });
          
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: OBSERVER_CONFIG.THRESHOLD, rootMargin: OBSERVER_CONFIG.ROOT_MARGIN }
  );

    fadeInSections.forEach((section) => sectionObserver.observe(section));
  }, null, 'Fade-in Sections');
}

// What I Do Section Animation
export function initWhatIDoAnimation(observer) {
  return safeExecute(() => {
    const whatIDoImage = document.querySelector('.what-i-do-image');
  const whatIDoText = document.querySelector('.what-i-do-text');
  const onpremImage = document.querySelector('.what-i-do-image-onprem');
  const onpremText = document.querySelector('.what-i-do-text-onprem');

  if (whatIDoImage) observer.observe(whatIDoImage);
  if (whatIDoText) observer.observe(whatIDoText);
    if (onpremImage) observer.observe(onpremImage);
    if (onpremText) observer.observe(onpremText);
  }, null, 'What I Do Animation');
}
