import { orchestrator } from '../mfe/Orchestrator.js';
import { manifest } from '../mfe/manifest.js';

const EXPAND_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 5V1h4M13 5V1H9M1 9v4h4M13 9v4H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const COMPRESS_ICON = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1v4H1M9 1v4h4M5 13V9H1M9 13V9h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export class GameComponent extends HTMLElement {
  #dead = false;
  #fsHandler = null;

  connectedCallback() {
    this.#dead = false;
    const { url, name } = manifest.entries.game;

    this.innerHTML = `
      <section class="game-page">
        <div class="ds-container">
          <header class="game-page__header">
            <div class="mfe-badge" aria-label="Micro frontend indicator">
              <span class="mfe-badge__dot"></span>
              Remote Micro Frontend
            </div>
            <h1 class="game-page__title">${name}</h1>
            <p class="game-page__desc">
              Isolated module loaded at runtime from a separate Vercel deployment
              via a custom MFE orchestrator — no shared build, no coupling.
            </p>
          </header>

          <div class="game-page__frame">
            <div class="game-page__frame-label">
              <span class="game-frame-origin">${url}</span>
              <button class="game-frame-fs" id="mfe-fullscreen" aria-label="Enter fullscreen">${EXPAND_ICON}</button>
            </div>
            <div class="mfe-status" id="mfe-status" role="status" aria-live="polite"></div>
            <div class="mfe-mount" id="mfe-mount"></div>
          </div>
        </div>
      </section>
    `;

    orchestrator.register('game', url);
    this.#initFullscreen();
    this.#load();
  }

  disconnectedCallback() {
    this.#dead = true;
    orchestrator.unmount('game');
    if (this.#fsHandler) {
      document.removeEventListener('fullscreenchange', this.#fsHandler);
      this.#fsHandler = null;
    }
  }

  #initFullscreen() {
    const btn = this.querySelector('#mfe-fullscreen');
    const frame = this.querySelector('.game-page__frame');
    if (!btn || !frame) return;

    this.#fsHandler = () => {
      const isFs = document.fullscreenElement === frame;
      btn.setAttribute('aria-label', isFs ? 'Exit fullscreen' : 'Enter fullscreen');
      btn.innerHTML = isFs ? COMPRESS_ICON : EXPAND_ICON;
    };
    document.addEventListener('fullscreenchange', this.#fsHandler);

    btn.addEventListener('click', () => {
      if (document.fullscreenElement === frame) {
        document.exitFullscreen();
      } else {
        frame.requestFullscreen();
      }
    });
  }

  async #load() {
    this.#showLoading();
    try {
      await orchestrator.mount('game', this.querySelector('#mfe-mount'));
      if (!this.#dead) this.#clearStatus();
    } catch (err) {
      if (!this.#dead) this.#showError(err);
    }
  }

  #showLoading() {
    const el = this.querySelector('#mfe-status');
    if (!el) return;
    el.hidden = false;
    el.innerHTML = `
      <div class="mfe-loader">
        <div class="mfe-spinner" aria-hidden="true"></div>
        <p class="mfe-loader__text">Connecting to remote module…</p>
        <code class="mfe-loader__url">${manifest.entries.game.url}</code>
      </div>
    `;
  }

  #showError(err) {
    const el = this.querySelector('#mfe-status');
    if (!el) return;
    el.hidden = false;
    el.innerHTML = `
      <div class="mfe-error">
        <div class="mfe-error__icon" aria-hidden="true">⚠</div>
        <h2 class="mfe-error__title">Module failed to load</h2>
        <p class="mfe-error__message">${err?.message ?? 'Unknown error'}</p>
        <button class="mfe-error__retry" id="mfe-retry">Retry</button>
      </div>
    `;
    this.querySelector('#mfe-retry')?.addEventListener('click', () => {
      this.#dead = false;
      this.#load();
    });
  }

  #clearStatus() {
    const el = this.querySelector('#mfe-status');
    if (!el) return;
    el.hidden = true;
    el.innerHTML = '';
  }
}
