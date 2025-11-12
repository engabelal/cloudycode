// PWA Install Prompt Module

let deferredPrompt = null;
let installPromptShown = false;

// Initialize PWA features
export function initPWA() {
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default mini-infobar
    e.preventDefault();
    
    // Store event for later use
    deferredPrompt = e;
    
    // Show custom install prompt after 30 seconds
    if (!installPromptShown && !isAppInstalled()) {
      setTimeout(showInstallPrompt, 30000);
    }
  });

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    deferredPrompt = null;
    hideInstallPrompt();
    
    // Store installation status
    localStorage.setItem('pwa-installed', 'true');
  });

  // Check if already dismissed
  if (localStorage.getItem('pwa-prompt-dismissed')) {
    return;
  }
}

// Check if app is already installed
function isAppInstalled() {
  // Check if running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // Check if previously installed
  if (localStorage.getItem('pwa-installed') === 'true') {
    return true;
  }
  
  return false;
}

// Show custom install prompt
function showInstallPrompt() {
  if (!deferredPrompt || installPromptShown) return;
  
  installPromptShown = true;
  
  // Create prompt UI
  const promptHTML = `
    <div class="pwa-install-prompt" id="pwaInstallPrompt" role="dialog" aria-labelledby="pwaPromptTitle">
      <div class="pwa-prompt-content">
        <button class="pwa-prompt-close" id="pwaPromptClose" aria-label="Close install prompt">×</button>
        <div class="pwa-prompt-icon">📱</div>
        <h3 id="pwaPromptTitle">Install CloudyCode.dev</h3>
        <p>Add to your home screen for quick access and offline support</p>
        <div class="pwa-prompt-actions">
          <button class="pwa-btn pwa-btn-primary" id="pwaInstallBtn">Install</button>
          <button class="pwa-btn pwa-btn-secondary" id="pwaDismissBtn">Not Now</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', promptHTML);
  
  // Add event listeners
  setTimeout(() => {
    const prompt = document.getElementById('pwaInstallPrompt');
    const installBtn = document.getElementById('pwaInstallBtn');
    const dismissBtn = document.getElementById('pwaDismissBtn');
    const closeBtn = document.getElementById('pwaPromptClose');
    
    if (prompt) prompt.classList.add('show');
    
    if (installBtn) {
      installBtn.addEventListener('click', handleInstall);
    }
    
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => dismissPrompt(false));
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => dismissPrompt(false));
    }
  }, 100);
}

// Handle install button click
async function handleInstall() {
  if (!deferredPrompt) return;
  
  // Show native install prompt
  deferredPrompt.prompt();
  
  // Wait for user choice
  const { outcome } = await deferredPrompt.userChoice;
  
  console.log(`User ${outcome} the install prompt`);
  
  if (outcome === 'accepted') {
    dismissPrompt(true);
  } else {
    dismissPrompt(false);
  }
  
  deferredPrompt = null;
}

// Dismiss install prompt
function dismissPrompt(installed = false) {
  const prompt = document.getElementById('pwaInstallPrompt');
  
  if (prompt) {
    prompt.classList.remove('show');
    setTimeout(() => prompt.remove(), 300);
  }
  
  if (!installed) {
    // Remember dismissal for 7 days
    const dismissedUntil = Date.now() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('pwa-prompt-dismissed', dismissedUntil);
  }
}

// Hide install prompt
function hideInstallPrompt() {
  const prompt = document.getElementById('pwaInstallPrompt');
  if (prompt) {
    prompt.classList.remove('show');
    setTimeout(() => prompt.remove(), 300);
  }
}

// Service Worker update notification
export function initSWUpdateNotification() {
  if (!('serviceWorker' in navigator)) return;
  
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Show update notification
    const updateHTML = `
      <div class="sw-update-notification" id="swUpdateNotification">
        <p>New version available!</p>
        <button class="sw-update-btn" onclick="window.location.reload()">Refresh</button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', updateHTML);
    
    setTimeout(() => {
      const notification = document.getElementById('swUpdateNotification');
      if (notification) notification.classList.add('show');
    }, 100);
  });
}
