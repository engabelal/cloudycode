// Scroll Animation
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Loading screen - hide immediately
const loadingScreen = document.getElementById("loading-screen");
if (loadingScreen) {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => loadingScreen.remove(), 400);
  }, 500);
}

// Scroll Progress Indicator
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });
}

// Force scroll to top - Mobile fix
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});

// Header scroll animation - Fixed
const header = document.getElementById("page-header");

function handleHeaderScroll() {
  if (window.pageYOffset > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navbar = document.querySelector(".navbar");
const navItems = document.querySelectorAll(".nav-item");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    const isActive = mobileMenuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    // Update aria-expanded
    mobileMenuToggle.setAttribute("aria-expanded", isActive);
  });

  // Close menu when clicking nav items
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navbar.classList.remove("active");
      document.body.classList.remove("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
      navbar.classList.remove("active");
      document.body.classList.remove("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Enhanced Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const texts = [
  "Automated, resilient, and brilliantly efficient",
  "Infrastructure as code, deployed with confidence",
  "Built for scale, designed for reliability",
  "Cloud-native, container-ready, production-proven"
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

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const whatIDoImage = document.querySelector(".what-i-do-image");
  const whatIDoText = document.querySelector(".what-i-do-text");
  const onpremImage = document.querySelector(".what-i-do-image-onprem");
  const onpremText = document.querySelector(".what-i-do-text-onprem");

  if (whatIDoImage) observer.observe(whatIDoImage);
  if (whatIDoText) observer.observe(whatIDoText);
  if (onpremImage) observer.observe(onpremImage);
  if (onpremText) observer.observe(onpremText);

  // Fade-in sections on scroll with lazy loading
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
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

  // Certification Modal
  window.openCertModal = function(title, desc, level, year, icon) {
    document.getElementById('certModalTitle').textContent = title;
    document.getElementById('certModalDesc').textContent = desc;
    document.getElementById('certModalLevel').textContent = level;
    document.getElementById('certModalYear').textContent = year;
    document.getElementById('certModalIcon').className = `cert-modal-icon ${icon}`;
    document.getElementById('certModal').classList.add('active');
  };

  window.closeCertModal = function(event) {
    if (!event || event.target.id === 'certModal') {
      document.getElementById('certModal').classList.remove('active');
    }
  };

  // Sticky CTA Mobile
  const stickyCta = document.getElementById("stickyCta");
  if (stickyCta) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 800) {
        stickyCta.classList.add("show");
      } else {
        stickyCta.classList.remove("show");
      }
    }, { passive: true });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");
  
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
