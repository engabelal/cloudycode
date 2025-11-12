// UI Interactions Module
import { trapFocus, scrollToTop } from './utils.js';

// Store last focused element for modals
let lastFocusedElement = null;

// Header Scroll Effect
export function initHeader() {
  const header = document.getElementById('page-header');
  if (!header) return;

  function handleHeaderScroll() {
    if (window.pageYOffset > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();
}

// Mobile Menu
export function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navbar = document.querySelector('.navbar');
  const navItems = document.querySelectorAll('.nav-item');

  if (!mobileMenuToggle) return;

  mobileMenuToggle.addEventListener('click', () => {
    const isActive = mobileMenuToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    mobileMenuToggle.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking nav items
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navbar.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll Progress Indicator
export function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });
}

// Certification Modal
export function initCertModal() {
  window.openCertModal = function(title, desc, level, year, icon) {
    lastFocusedElement = document.activeElement;
    
    const modal = document.getElementById('certModal');
    document.getElementById('certModalTitle').textContent = title;
    document.getElementById('certModalDesc').textContent = desc;
    document.getElementById('certModalLevel').textContent = level;
    document.getElementById('certModalYear').textContent = year;
    document.getElementById('certModalIcon').className = `cert-modal-icon ${icon}`;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Trap focus and focus first element
    trapFocus(modal);
    setTimeout(() => {
      const closeBtn = modal.querySelector('.cert-modal-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  };

  window.closeCertModal = function(event) {
    if (!event || event.target.id === 'certModal') {
      const modal = document.getElementById('certModal');
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      
      // Return focus to trigger element
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }
  };
}

// Sticky CTA Mobile
export function initStickyCTA() {
  const stickyCta = document.getElementById('stickyCta');
  if (!stickyCta) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 800) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }, { passive: true });
}

// Back to Top Button
export function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    scrollToTop();
  });
}

// Loading Screen
export function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => loadingScreen.remove(), 400);
  }, 500);
}

// Global Escape Key Handler for Modals
export function initModalEscapeHandler() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const certModal = document.getElementById('certModal');
      const projectModal = document.getElementById('projectModal');
      
      if (certModal && certModal.classList.contains('active')) {
        window.closeCertModal();
      }
      if (projectModal && projectModal.classList.contains('active')) {
        window.closeProjectModal();
      }
    }
  });
}
