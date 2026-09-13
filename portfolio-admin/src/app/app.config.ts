import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ── Zoneless change detection (Angular 19 stable) ──────────────────────
    provideZonelessChangeDetection(),

    // ── Hash-based routing so MFE routes don't clash with the host SPA ────
    provideRouter(routes, withHashLocation()),

    // ── HTTP with Fetch API (better for zoneless) ──────────────────────────
    provideHttpClient(withFetch()),

    // ── Material animations ────────────────────────────────────────────────
    provideAnimationsAsync(),
  ],
};
