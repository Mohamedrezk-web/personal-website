import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WorkExperienceStore } from '../../store/work-experience.store';
import { ProjectsStore } from '../../store/projects.store';
import { ContactMessagesStore } from '../../store/contact-messages.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  styles: [`
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-top: 24px; }
    .stat-card { background: #111827; border: 1px solid #1e2d4a; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; transition: border-color .15s; }
    .stat-card:hover { border-color: #818cf8; }
    .stat-icon { font-size: 22px; color: #818cf8; }
    .stat-value { font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700; color: #e8edf8; }
    .stat-label { font-size: 13px; color: #4b5679; }
  `],
  template: `
    <h1 class="page-title">Dashboard</h1>
    <p style="color:#4b5679;font-size:13.5px;">Overview of all portfolio content managed through this CMS.</p>

    <div class="grid">
      <a class="stat-card" routerLink="../experience">
        <mat-icon class="stat-icon">work</mat-icon>
        <div class="stat-value">{{ experienceStore.entities().length }}</div>
        <div class="stat-label">Work Experience entries</div>
      </a>
      <a class="stat-card" routerLink="../projects">
        <mat-icon class="stat-icon" style="color:#38bdf8">code</mat-icon>
        <div class="stat-value" style="color:#38bdf8">{{ projectsStore.entities().length }}</div>
        <div class="stat-label">Portfolio projects</div>
      </a>
      <a class="stat-card" routerLink="../messages">
        <mat-icon class="stat-icon" style="color:#34d399">inbox</mat-icon>
        <div class="stat-value" style="color:#34d399">{{ messagesStore.entities().length }}</div>
        <div class="stat-label">Contact messages</div>
      </a>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  readonly experienceStore = inject(WorkExperienceStore);
  readonly projectsStore   = inject(ProjectsStore);
  readonly messagesStore   = inject(ContactMessagesStore);

  ngOnInit() {
    this.experienceStore.loadAll();
    this.projectsStore.loadAll();
    this.messagesStore.loadAll();
  }
}
