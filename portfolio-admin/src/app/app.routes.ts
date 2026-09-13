import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/work-experience/work-experience-list.component').then(m => m.WorkExperienceListComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/projects/projects-list.component').then(m => m.ProjectsListComponent),
      },
      {
        path: 'technologies',
        loadComponent: () => import('./features/technologies/technologies.component').then(m => m.TechnologiesComponent),
      },
      {
        path: 'hero',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'about',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'contact-info',
        loadComponent: () => import('./features/contact-info/contact-info.component').then(m => m.ContactInfoComponent),
      },
      {
        path: 'messages',
        loadComponent: () => import('./features/contact-messages/contact-messages.component').then(m => m.ContactMessagesComponent),
      },
    ],
  },
];
