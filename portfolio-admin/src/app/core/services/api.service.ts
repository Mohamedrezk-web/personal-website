import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  HeroSection, AboutSection, WorkExperience, TechnologySection,
  Project, ContactInfoSection, ContactMessage, PortfolioResponse,
} from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {

  // ── TODO: point this at your deployed Spring Boot API ──────────────────
  private readonly base = 'http://localhost:8080/api';

  private readonly http = inject(HttpClient);

  // ── Hero (singleton) ────────────────────────────────────────────────────
  getHero(): Observable<HeroSection>         { return this.http.get<HeroSection>(`${this.base}/hero`); }
  updateHero(h: HeroSection): Observable<HeroSection> { return this.http.put<HeroSection>(`${this.base}/hero`, h); }

  // ── About (singleton) ───────────────────────────────────────────────────
  getAbout(): Observable<AboutSection>       { return this.http.get<AboutSection>(`${this.base}/about`); }
  updateAbout(a: AboutSection): Observable<AboutSection> { return this.http.put<AboutSection>(`${this.base}/about`, a); }

  // ── Work Experience ─────────────────────────────────────────────────────
  getExperience(): Observable<WorkExperience[]>               { return this.http.get<WorkExperience[]>(`${this.base}/experience`); }
  createExperience(e: Omit<WorkExperience, 'id'>): Observable<WorkExperience> { return this.http.post<WorkExperience>(`${this.base}/experience`, e); }
  updateExperience(e: WorkExperience): Observable<WorkExperience>             { return this.http.put<WorkExperience>(`${this.base}/experience/${e.id}`, e); }
  deleteExperience(id: string): Observable<void>              { return this.http.delete<void>(`${this.base}/experience/${id}`); }

  // ── Technologies (singleton) ────────────────────────────────────────────
  getTechnologies(): Observable<TechnologySection>            { return this.http.get<TechnologySection>(`${this.base}/technologies`); }
  updateTechnologies(t: TechnologySection): Observable<TechnologySection> { return this.http.put<TechnologySection>(`${this.base}/technologies`, t); }

  // ── Projects ────────────────────────────────────────────────────────────
  getPortfolio(category?: string): Observable<PortfolioResponse> {
    const params = category && category !== '*' ? { category } : {};
    return this.http.get<PortfolioResponse>(`${this.base}/portfolio`, { params });
  }
  createProject(p: Omit<Project, 'id'>): Observable<Project> { return this.http.post<Project>(`${this.base}/portfolio`, p); }
  updateProject(p: Project): Observable<Project>             { return this.http.put<Project>(`${this.base}/portfolio/${p.id}`, p); }
  deleteProject(id: string): Observable<void>                { return this.http.delete<void>(`${this.base}/portfolio/${id}`); }

  // ── Contact Info (singleton) ────────────────────────────────────────────
  getContactInfo(): Observable<ContactInfoSection>           { return this.http.get<ContactInfoSection>(`${this.base}/contact-info`); }
  updateContactInfo(c: ContactInfoSection): Observable<ContactInfoSection> { return this.http.put<ContactInfoSection>(`${this.base}/contact-info`, c); }

  // ── Contact Messages (read + delete only) ──────────────────────────────
  getContactMessages(): Observable<ContactMessage[]>         { return this.http.get<ContactMessage[]>(`${this.base}/contact/messages`); }
  deleteContactMessage(id: string): Observable<void>         { return this.http.delete<void>(`${this.base}/contact/messages/${id}`); }
}
