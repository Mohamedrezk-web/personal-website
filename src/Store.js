/**
 * Lightweight state management system using JavaScript Proxies.
 * Provides reactive state updates and subscription capabilities.
 */
export class Store {
  /**
   * Creates a new Store instance with optional initial state.
   * @param {Object} initialState - Initial state object
   */
  constructor(initialState = {}) {
    this.listeners = new Set();

    // Create reactive state using Proxy
    this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value;
        this.notify();
        return true;
      },
    });
  }

  /**
   * Registers a callback to be executed when state changes.
   * @param {Function} listener - Callback function that receives current state
   * @returns {Function} Cleanup function to unsubscribe the listener
   */
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Triggers all registered listeners with the current state.
   * Called internally when state changes occur.
   * @private
   */
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
