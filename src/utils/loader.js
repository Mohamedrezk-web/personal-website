// Loader utility to handle preloader and improve FCP
export class Loader {
  static init() {
    // Store DOM elements
    const preloader = document.getElementById('preloader');

    // Handle page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () =>
        this.hideLoader(preloader)
      );
    } else {
      this.hideLoader(preloader);
    }

    // Add page transition observer
    this.observePageTransitions();
  }

  static hideLoader(preloader) {
    if (!preloader) return;

    // Add fade out effect
    preloader.style.transition = 'opacity 0.3s ease-out';
    preloader.style.opacity = '0';

    // Remove from DOM after animation
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 300);
  }

  static showLoader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Reset styles
    preloader.style.transition = 'opacity 0.3s ease-in';
    preloader.style.display = 'flex';
    preloader.style.opacity = '1';
    document.body.style.overflow = 'hidden';
  }

  static observePageTransitions() {
    // Observe route changes if using client-side routing
    window.addEventListener('popstate', () => {
      this.handlePageTransition();
    });

    // Observe clicks on internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        this.handlePageTransition();
      }
    });
  }

  static handlePageTransition() {
    this.showLoader();
    // Hide loader after content is likely loaded
    setTimeout(
      () => this.hideLoader(document.getElementById('preloader')),
      300
    );
  }
}
