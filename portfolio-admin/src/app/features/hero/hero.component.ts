import { Component, inject, OnInit, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeroStore } from '../../store/hero.store';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressBarModule,
  ],
  styles: [`
    form { display: flex; flex-direction: column; gap: 14px; max-width: 680px; margin-top: 16px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    mat-form-field { width: 100%; }
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #4b5679; margin: 8px 0 -4px; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Hero Section</h1>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="form.invalid || store.loading()">
        <mat-icon>save</mat-icon> Save
      </button>
    </div>

    <form [formGroup]="form">
      <div class="row">
        <mat-form-field>
          <mat-label>Title (e.g. "Hello World,")</mat-label>
          <input matInput formControlName="title">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
      </div>

      <mat-form-field>
        <mat-label>Role / subtitle</mat-label>
        <input matInput formControlName="role">
      </mat-form-field>

      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" rows="4"></textarea>
      </mat-form-field>

      <div class="row">
        <mat-form-field>
          <mat-label>Status Label (badge)</mat-label>
          <input matInput formControlName="statusLabel">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Scroll Text</mat-label>
          <input matInput formControlName="scrollText">
        </mat-form-field>
      </div>

      <p class="section-label">Social links, satellites, and badges are managed via JSON arrays.</p>

      <mat-form-field>
        <mat-label>Social Links JSON</mat-label>
        <textarea matInput formControlName="socialLinksJson" rows="5"
          placeholder='[{"href":"...","icon":"...","label":"..."}]'></textarea>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Satellites JSON</mat-label>
        <textarea matInput formControlName="satellitesJson" rows="4"
          placeholder='[{"label":"...","icon":"...","color":"...","orbit":100}]'></textarea>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Badges JSON</mat-label>
        <textarea matInput formControlName="badgesJson" rows="3"
          placeholder='[{"label":"...","icon":"...","color":"..."}]'></textarea>
      </mat-form-field>
    </form>
  `,
})
export class HeroComponent implements OnInit {
  readonly store = inject(HeroStore);
  readonly snack = inject(MatSnackBar);
  readonly fb    = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    title:          ['', Validators.required],
    name:           ['', Validators.required],
    role:           ['', Validators.required],
    description:    ['', Validators.required],
    statusLabel:    [''],
    scrollText:     [''],
    socialLinksJson:['[]'],
    satellitesJson: ['[]'],
    badgesJson:     ['[]'],
  });

  constructor() {
    effect(() => {
      const data = this.store.data();
      if (!data) return;
      this.form.patchValue({
        title:          data.title,
        name:           data.name,
        role:           data.role,
        description:    data.description,
        statusLabel:    data.statusLabel,
        scrollText:     data.scrollText,
        socialLinksJson:JSON.stringify(data.socialLinks ?? [], null, 2),
        satellitesJson: JSON.stringify(data.satellites  ?? [], null, 2),
        badgesJson:     JSON.stringify(data.badges      ?? [], null, 2),
      });
    });
  }

  ngOnInit() { this.store.load(); }

  save() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    try {
      const payload = {
        ...this.store.data()!,
        title:       raw.title,
        name:        raw.name,
        role:        raw.role,
        description: raw.description,
        statusLabel: raw.statusLabel,
        scrollText:  raw.scrollText,
        socialLinks: JSON.parse(raw.socialLinksJson),
        satellites:  JSON.parse(raw.satellitesJson),
        badges:      JSON.parse(raw.badgesJson),
      };
      this.store.update(payload).subscribe({
        next:  () => this.snack.open('Hero section saved', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
      });
    } catch {
      this.snack.open('Invalid JSON in one of the array fields', 'OK', { duration: 4000 });
    }
  }
}
