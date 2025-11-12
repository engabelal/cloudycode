// Error Handling Module

// Image Error Handler with Placeholder
export function handleImageError(img) {
  if (img.dataset.errorHandled) return;
  img.dataset.errorHandled = 'true';
  
  // Create SVG placeholder
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%2311071f' width='400' height='400'/%3E%3Ctext fill='%23a362ff' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage not available%3C/text%3E%3C/svg%3E`;
  
  img.src = placeholder;
  img.alt = img.alt || 'Image not available';
  console.warn('Image failed to load:', img.dataset.originalSrc || img.src);
}

// Initialize Image Error Handlers
export function initImageErrorHandlers() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Store original src
    if (!img.dataset.originalSrc) {
      img.dataset.originalSrc = img.src || img.dataset.src;
    }
    
    img.addEventListener('error', () => handleImageError(img), { once: true });
  });
}

// Safe External Script Loader
export function safeLoadScript(scriptName, callback) {
  try {
    if (typeof callback === 'function') {
      callback();
    }
  } catch (error) {
    console.warn(`${scriptName} failed to initialize:`, error.message);
    // Continue without the script
  }
}

// Try-Catch Wrapper for Functions
export function safeExecute(fn, fallback = null, context = 'Function') {
  try {
    return fn();
  } catch (error) {
    console.error(`${context} error:`, error.message);
    if (fallback && typeof fallback === 'function') {
      return fallback();
    }
    return null;
  }
}

// Global Error Handler
export function initGlobalErrorHandler() {
  window.addEventListener('error', (event) => {
    // Handle image errors
    if (event.target.tagName === 'IMG') {
      handleImageError(event.target);
      event.preventDefault();
      return;
    }
    
    // Log other errors without breaking the site
    console.error('Global error caught:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  });
}

// Check if External Library Loaded
export function isLibraryLoaded(libraryName) {
  const libraries = {
    'particlesJS': typeof particlesJS !== 'undefined',
    'AOS': typeof AOS !== 'undefined',
    'FontAwesome': document.querySelector('link[href*="fontawesome"]') !== null
  };
  
  return libraries[libraryName] || false;
}

// Show User-Friendly Error Toast
export function showErrorToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'error-toast';
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Network Status Monitor
export function initNetworkMonitor() {
  if (!navigator.onLine) {
    console.warn('No internet connection detected');
  }
  
  window.addEventListener('online', () => {
    console.log('Connection restored');
  });
  
  window.addEventListener('offline', () => {
    console.warn('Connection lost');
    showErrorToast('No internet connection');
  });
}
