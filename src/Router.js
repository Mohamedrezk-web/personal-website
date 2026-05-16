
export class Router {
  
  constructor(routes) {
    this.routes = routes;
    this.currentPath = '';

window.addEventListener('popstate', () => this.handleRoute());

this.handleRoute();
  }

handleRoute() {
    const path = window.location.pathname;
    this.currentPath = path;
    const route = this.routes[path] || this.routes['/'];
    route();
  }

navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }
}
