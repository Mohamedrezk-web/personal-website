const Status = {
  IDLE: 'idle',
  LOADING: 'loading',
  BOOTSTRAPPED: 'bootstrapped',
  MOUNTED: 'mounted',
  ERROR: 'error',
};

class MFEOrchestrator {
  #registry = new Map();

  register(name, url) {
    if (!this.#registry.has(name)) {
      this.#registry.set(name, { url, status: Status.IDLE, module: null, container: null });
    }
  }

  async mount(name, container) {
    const entry = this.#registry.get(name);
    if (!entry) throw new Error(`MFE "${name}" is not registered.`);

    if (entry.status === Status.MOUNTED) await this.unmount(name);

    if (entry.status === Status.IDLE || entry.status === Status.ERROR) {
      entry.status = Status.LOADING;
      try {
        await this.#loadScript(name, entry.url);
      } catch (err) {
        entry.status = Status.ERROR;
        throw err;
      }

      const mod = window.__MFE_REGISTRY__?.[name];
      if (!mod) {
        entry.status = Status.ERROR;
        throw new Error(`MFE "${name}" loaded but did not register on window.__MFE_REGISTRY__.`);
      }

      entry.module = mod;
      entry.status = Status.IDLE;
    }

    if (entry.status === Status.IDLE) {
      await entry.module.bootstrap?.();
      entry.status = Status.BOOTSTRAPPED;
    }

    entry.container = container;
    await entry.module.mount(container);
    entry.status = Status.MOUNTED;
  }

  async unmount(name) {
    const entry = this.#registry.get(name);
    if (!entry || entry.status !== Status.MOUNTED) return;
    await entry.module?.unmount?.(entry.container);
    entry.container = null;
    entry.status = Status.BOOTSTRAPPED;
  }

  getStatus(name) {
    return this.#registry.get(name)?.status ?? 'unregistered';
  }

  #loadScript(name, url) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-mfe="${name}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.dataset.mfe = name;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to fetch remote module from: ${url}`));
      document.head.appendChild(script);
    });
  }
}

export const orchestrator = new MFEOrchestrator();
