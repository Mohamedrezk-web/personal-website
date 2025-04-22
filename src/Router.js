/**
 * Client-side router implementation using the History API.
 * Enables SPA-style navigation without page reloads.
 */
export class Router {
  /**
   * Creates a new Router instance.
   * @param {Object} routes - Map of paths to handler functions
   */
  constructor(routes) {
    this.routes = routes;
    this.currentPath = '';

    // Handle browser navigation events
    window.addEventListener('popstate', () => this.handleRoute());

    // Handle initial route
    this.handleRoute();
  }

  /**
   * Executes the handler function for the current route.
   * Falls back to root route ('/') if current path isn't found.
   */
  handleRoute() {
    const path = window.location.pathname;
    this.currentPath = path;
    const route = this.routes[path] || this.routes['/'];
    route();
  }

  /**
   * Programmatically navigates to a new route.
   * Updates browser history and triggers route handler.
   * @param {string} path - Target route path
   */
  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}
