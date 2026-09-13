import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { WorkExperience } from '../../core/models';

@Component({
  selector: 'app-work-experience-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatButtonModule,
  ],
  styles: [`
    form { display: flex; flex-direction: column; gap: 16px; padding: 8px 0; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    mat-form-field { width: 100%; }
    .hint { font-size: 11px; color: #4b5679; margin-top: -8px; }
  `],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit' : 'Add' }} Work Experience</h2>

    <mat-dialog-content>
      <form [formGroup]="form">

        <div class="row">
          <mat-form-field>
            <mat-label>Company</mat-label>
            <input matInput formControlName="company" placeholder="SIGMA EMEA">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Position</mat-label>
            <input matInput formControlName="position" placeholder="Frontend Developer">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field>
            <mat-label>Period</mat-label>
            <input matInput formControlName="period" placeholder="Feb 2026 - Present">
          </mat-form-field>

          <div style="display:flex;align-items:center;padding-top:8px;">
            <mat-checkbox formControlName="current">Current job</mat-checkbox>
          </div>
        </div>

        <mat-form-field>
          <mat-label>Responsibilities</mat-label>
          <textarea matInput formControlName="responsibilities" rows="5"
            placeholder="One responsibility per line"></textarea>
        </mat-form-field>
        <p class="hint">Each line becomes a separate bullet point.</p>

        <mat-form-field>
          <mat-label>Tech Stack</mat-label>
          <input matInput formControlName="stack" placeholder="Angular,TypeScript,RxJS">
        </mat-form-field>
        <p class="hint">Comma-separated — e.g. Angular,TypeScript,RxJS</p>

        <div class="row">
          <mat-form-field>
            <mat-label>Accent Color</mat-label>
            <input matInput formControlName="color" placeholder="#818cf8">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Glow Color</mat-label>
            <input matInput formControlName="glow" placeholder="rgba(99,102,241,.4)">
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field>
            <mat-label>Background</mat-label>
            <input matInput formControlName="bg" placeholder="rgba(99,102,241,.08)">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Border</mat-label>
            <input matInput formControlName="border" placeholder="rgba(99,102,241,.3)">
          </mat-form-field>
        </div>

      </form>
    </mat-dialog-content>

    <div class="dialog-actions">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="submit()">
        {{ isEdit ? 'Update' : 'Create' }}
      </button>
    </div>
  `,
})
export class WorkExperienceFormComponent implements OnInit {
  readonly data    = inject<WorkExperience | null>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<WorkExperienceFormComponent>);
  readonly fb      = inject(NonNullableFormBuilder);

  readonly isEdit  = !!this.data?.id;

  readonly form = this.fb.group({
    company:         ['', Validators.required],
    position:        ['', Validators.required],
    period:          ['', Validators.required],
    current:         [false],
    responsibilities:['', Validators.required],
    stack:           ['', Validators.required],
    color:           ['#818cf8'],
    glow:            ['rgba(99,102,241,.4)'],
    bg:              ['rgba(99,102,241,.08)'],
    border:          ['rgba(99,102,241,.3)'],
  });

  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        ...this.data,
        responsibilities: this.data.responsibilities.join('\n'),
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const result = {
      ...(this.isEdit ? { id: this.data!.id } : {}),
      ...raw,
      responsibilities: raw.responsibilities
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean),
    };
    this.dialogRef.close(result);
  }
}
