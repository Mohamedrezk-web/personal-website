import { Component, inject, OnInit, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AboutStore } from '../../store/about.store';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressBarModule,
  ],
  styles: [`
    form { display: flex; flex-direction: column; gap: 14px; max-width: 680px; margin-top: 16px; }
    mat-form-field { width: 100%; }
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #4b5679; margin: 8px 0 -4px; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">About Section</h1>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="form.invalid || store.loading()">
        <mat-icon>save</mat-icon> Save
      </button>
    </div>

    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>Image path</mat-label>
        <input matInput formControlName="image" placeholder="uploads/profile.jpg">
      </mat-form-field>

      <p class="section-label">Bio paragraphs — one per line</p>
      <mat-form-field>
        <mat-label>Bio</mat-label>
        <textarea matInput formControlName="bio" rows="6"
          placeholder="Each line becomes a separate paragraph"></textarea>
      </mat-form-field>

      <p class="section-label">Stat cards JSON</p>
      <mat-form-field>
        <mat-label>Stat Cards JSON</mat-label>
        <textarea matInput formControlName="statCardsJson" rows="5"
          placeholder='[{"value":"5+","label":"Years experience","icon":"work"}]'></textarea>
      </mat-form-field>
    </form>
  `,
})
export class AboutComponent implements OnInit {
  readonly store = inject(AboutStore);
  readonly snack = inject(MatSnackBar);
  readonly fb    = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    image:         [''],
    bio:           ['', Validators.required],
    statCardsJson: ['[]'],
  });

  constructor() {
    effect(() => {
      const data = this.store.data();
      if (!data) return;
      this.form.patchValue({
        image:         data.image,
        bio:           (data.bio ?? []).join('\n'),
        statCardsJson: JSON.stringify(data.statCards ?? [], null, 2),
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
        image:     raw.image,
        bio:       raw.bio.split('\n').map(s => s.trim()).filter(Boolean),
        statCards: JSON.parse(raw.statCardsJson),
      };
      this.store.update(payload).subscribe({
        next:  () => this.snack.open('About section saved', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
      });
    } catch {
      this.snack.open('Invalid JSON in stat cards', 'OK', { duration: 4000 });
    }
  }
}
