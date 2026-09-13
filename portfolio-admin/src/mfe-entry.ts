import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

let appRef: ApplicationRef | null = null;

// bootstrap() is called once. Angular needs a real DOM element to attach to.
// We defer actual bootstrap until mount() provides a container.
let pendingContainer: HTMLElement | null = null;
let bootstrapped = false;

export async function bootstrap(): Promise<void> {
  // no-op — actual bootstrap happens in mount() so we have the container
}

export async function mount(container: HTMLElement): Promise<void> {
  if (!bootstrapped) {
    bootstrapped = true;
    // Insert Angular's host element into the provided container
    const host = document.createElement('app-root');
    host.style.display = 'block';
    host.style.height = '100%';
    container.appendChild(host);
    appRef = await bootstrapApplication(AppComponent, appConfig);
  } else {
    // Re-show
    const host = container.querySelector('app-root') ?? document.querySelector('app-root');
    if (host) {
      container.appendChild(host);
      (host as HTMLElement).style.display = 'block';
    }
  }
}

export function unmount(container: HTMLElement): void {
  const host = container.querySelector('app-root');
  if (host) (host as HTMLElement).style.display = 'none';
}
