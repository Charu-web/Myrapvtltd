/**
 * theme.js — Shared Theme Utility
 * Loads on all pages via <script src="/theme.js"> placed BEFORE body renders.
 * Reads localStorage and applies theme immediately to prevent flash of wrong theme.
 */

// IIFE: apply theme immediately (prevents FOUC)
(function () {
  const saved = localStorage.getItem('crm_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

// Full theme API available after DOM is ready
window.CRMTheme = {
  get() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },
  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('crm_theme', theme);
    // Update all toggle buttons on page
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    });
  },
  toggle() {
    const next = this.get() === 'dark' ? 'light' : 'dark';
    this.set(next);
    return next;
  },
  init(btnSelector) {
    const btns = document.querySelectorAll(btnSelector || '[data-theme-toggle]');
    btns.forEach(btn => {
      // Set initial state
      const icon = btn.querySelector('.theme-icon');
      if (icon) icon.textContent = this.get() === 'dark' ? '☀️' : '🌙';
      btn.title = this.get() === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

      btn.addEventListener('click', () => {
        const next = this.toggle();
        // Micro-animation: brief scale
        btn.style.transform = 'scale(0.85)';
        setTimeout(() => { btn.style.transform = ''; }, 150);
      });
    });
  }
};
