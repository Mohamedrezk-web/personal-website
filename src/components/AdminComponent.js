import { orchestrator } from '../mfe/Orchestrator.js';
import { manifest } from '../mfe/manifest.js';

class AdminComponent extends HTMLElement {
  #dead = false;

  connectedCallback() {
    this.#dead = false;
    const { url, type } = manifest.entries.admin;

    this.innerHTML = `
      <section class="admin-page">
        <header class="admin-page__header">
          <span class="mfe-badge">
            <span class="mfe-badge__dot"></span>
            Angular 19 · Zoneless · Signals
          </span>
          <h1 class="admin-page__title">Portfolio Admin</h1>
          <p class="admin-page__desc">
            Manage all portfolio content — work experience, projects, technologies,
            and page sections — from this integrated Angular CMS.
          </p>
        </header>

        <div class="admin-page__frame">
          <div class="admin-page__frame-label">
            <span class="admin-frame-origin">${url}</span>
          </div>

          <div class="mfe-status" id="admin-status">
            <div class="mfe-loader">
              <div class="mfe-spinner" aria-hidden="true"></div>
              <p class="mfe-loader__text">Loading Angular admin panel…</p>
              <code class="mfe-loader__url">${url}</code>
            </div>
          </div>

          <div class="admin-mount" id="admin-mount"></div>
        </div>
      </section>
    `;

    orchestrator.register('admin', url, { type });
    this.#load();
  }

  disconnectedCallback() {
    this.#dead = true;
    orchestrator.unmount('admin');
  }

  async #load() {
    const status = this.querySelector('#admin-status');
    const mount  = this.querySelector('#admin-mount');

    try {
      await orchestrator.mount('admin', mount);
      if (!this.#dead && status) status.hidden = true;
    } catch (err) {
      if (this.#dead) return;
      if (status) {
        status.innerHTML = `
          <div class="mfe-error">
            <span class="mfe-error__icon">⚠</span>
            <p class="mfe-error__title">Failed to load admin panel</p>
            <code class="mfe-error__message">${err.message}</code>
            <button class="mfe-error__retry" id="admin-retry">Retry</button>
          </div>
        `;
        this.querySelector('#admin-retry')?.addEventListener('click', () => {
          status.innerHTML = `
            <div class="mfe-loader">
              <div class="mfe-spinner" aria-hidden="true"></div>
              <p class="mfe-loader__text">Retrying…</p>
            </div>
          `;
          this.#load();
        });
      }
    }
  }
}

export { AdminComponent };
