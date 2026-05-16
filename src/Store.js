
export class Store {
  
  constructor(initialState = {}) {
    this.listeners = new Set();

this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value;
        this.notify();
        return true;
      },
    });
  }

subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}
