// Animations Module

// Typing Effect
export function initTypingEffect() {
  const typedTextSpan = document.querySelector('.typed-text');
  if (!typedTextSpan) return;

  const texts = [
    'Automated, resilient, and brilliantly efficient',
    'Infrastructure as code, deployed with confidence',
    'Built for scale, designed for reliability',
    'Cloud-native, container-ready, production-proven'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
      typedTextSpan.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    } else if (isDeleting && charIndex > 0) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, 25);
    } else if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 3000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    }
  }

  setTimeout(type, 1500);
}

// Particles.js Configuration
export function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.6,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 0.5,
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
}

// AOS Initialization
export function initAOS() {
  if (typeof AOS === 'undefined') return;

  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });
}

// Fade-in Sections Observer
export function initFadeInSections() {
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
    { threshold: 0.1, rootMargin: '50px' }
  );

  fadeInSections.forEach((section) => sectionObserver.observe(section));
}

// What I Do Section Animation
export function initWhatIDoAnimation(observer) {
  const whatIDoImage = document.querySelector('.what-i-do-image');
  const whatIDoText = document.querySelector('.what-i-do-text');
  const onpremImage = document.querySelector('.what-i-do-image-onprem');
  const onpremText = document.querySelector('.what-i-do-text-onprem');

  if (whatIDoImage) observer.observe(whatIDoImage);
  if (whatIDoText) observer.observe(whatIDoText);
  if (onpremImage) observer.observe(onpremImage);
  if (onpremText) observer.observe(onpremText);
}
