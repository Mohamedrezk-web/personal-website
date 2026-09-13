import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface NavItem {
  route: string;
  icon: string;
  label: string;
  group?: string;
}

const NAV: NavItem[] = [
  { route: 'dashboard',    icon: 'dashboard',    label: 'Dashboard',       group: 'Overview' },
  { route: 'experience',   icon: 'work',         label: 'Work Experience', group: 'Content' },
  { route: 'projects',     icon: 'code',         label: 'Projects',        group: 'Content' },
  { route: 'technologies', icon: 'build',        label: 'Technologies',    group: 'Content' },
  { route: 'hero',         icon: 'person',       label: 'Hero Section',    group: 'Pages' },
  { route: 'about',        icon: 'info',         label: 'About Section',   group: 'Pages' },
  { route: 'contact-info', icon: 'contact_mail', label: 'Contact Info',    group: 'Pages' },
  { route: 'messages',     icon: 'inbox',        label: 'Messages',        group: 'Inbox' },
];

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatIconModule, MatButtonModule, MatTooltipModule,
  ],
  styles: [`
    :host { display: flex; height: 100%; }

    .shell-sidenav { width: 220px; background: #111827; border-right: 1px solid #1e2d4a; }

    .brand {
      display: flex; align-items: center; gap: 10px;
      padding: 20px 16px 12px;
      border-bottom: 1px solid #1e2d4a;
    }
    .brand-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #818cf8;
      box-shadow: 0 0 8px #818cf8;
    }
    .brand-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; font-weight: 700; color: #e8edf8; letter-spacing: .04em;
    }
    .brand-sub { font-size: 10px; color: #4b5679; }

    .nav-group-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px; letter-spacing: .12em; text-transform: uppercase;
      color: #4b5679; padding: 14px 16px 4px; display: block;
    }

    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 9px 16px; border-radius: 6px; margin: 1px 8px;
      color: #4b5679; font-size: 13.5px; font-weight: 500;
      text-decoration: none; cursor: pointer;
      transition: background .15s, color .15s;
      border-left: 2px solid transparent;
    }
    .nav-item:hover { background: rgba(129,140,248,.06); color: #c9d1e9; }
    .nav-item.active {
      background: rgba(129,140,248,.1);
      color: #818cf8;
      border-color: #818cf8;
    }
    .nav-item mat-icon { font-size: 18px; width: 18px; height: 18px; }

    .toolbar {
      background: #111827 !important;
      border-bottom: 1px solid #1e2d4a;
      color: #c9d1e9;
      position: sticky; top: 0; z-index: 10;
    }
    .toolbar-title { font-size: 14px; font-weight: 600; flex: 1; }
    .toolbar-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; padding: 2px 8px; border-radius: 4px;
      background: rgba(129,140,248,.12); border: 1px solid rgba(129,140,248,.3);
      color: #818cf8;
    }

    .content-area { flex: 1; overflow-y: auto; background: #090d18; }
    .content-inner { padding: 32px; max-width: 1100px; }
  `],
  template: `
    <mat-sidenav-container style="flex:1;height:100%;">

      <mat-sidenav class="shell-sidenav" mode="side" opened [disableClose]="true">
        <div class="brand">
          <div class="brand-dot"></div>
          <div>
            <div class="brand-text">Portfolio Admin</div>
            <div class="brand-sub">CMS · v1.0</div>
          </div>
        </div>

        @for (group of groups(); track group) {
          <span class="nav-group-label">{{ group }}</span>
          @for (item of byGroup(group); track item.route) {
            <a class="nav-item"
               [routerLink]="item.route"
               routerLinkActive="active">
              <mat-icon>{{ item.icon }}</mat-icon>
              {{ item.label }}
            </a>
          }
        }
      </mat-sidenav>

      <mat-sidenav-content class="content-area">
        <mat-toolbar class="toolbar">
          <span class="toolbar-title">Portfolio CMS</span>
          <span class="toolbar-badge">Angular 19 · Zoneless</span>
        </mat-toolbar>
        <div class="content-inner">
          <router-outlet />
        </div>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
})
export class ShellComponent {
  readonly nav = signal(NAV);

  groups() {
    return [...new Set(NAV.map(n => n.group ?? ''))];
  }

  byGroup(group: string) {
    return NAV.filter(n => (n.group ?? '') === group);
  }
}
