import { Component, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../core/models';

const CATEGORIES = [
  { id: 'angular', name: 'Angular' },
  { id: 'nextjs',  name: 'NextJS'  },
  { id: 'nodejs',  name: 'NodeJS'  },
];

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule,
  ],
  styles: [`
    form { display: flex; flex-direction: column; gap: 14px; padding: 8px 0; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    mat-form-field { width: 100%; }
  `],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit' : 'Add' }} Project</h2>

    <mat-dialog-content>
      <form [formGroup]="form">

        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Collaborative Doc AI">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>

        <div class="row">
          <mat-form-field>
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" (selectionChange)="onCategoryChange($event.value)">
              @for (cat of categories; track cat.id) {
                <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Display Order</mat-label>
            <input matInput type="number" formControlName="displayOrder">
          </mat-form-field>
        </div>

        <mat-form-field>
          <mat-label>Image path</mat-label>
          <input matInput formControlName="image" placeholder="uploads/my-project.png">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Live URL</mat-label>
          <input matInput formControlName="liveLink" placeholder="https://example.com">
        </mat-form-field>

        <mat-form-field>
          <mat-label>GitHub URL (optional)</mat-label>
          <input matInput formControlName="githubLink" placeholder="https://github.com/...">
        </mat-form-field>

        <div class="row">
          <mat-form-field>
            <mat-label>Accent Color</mat-label>
            <input matInput formControlName="color" placeholder="#818cf8">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Glow</mat-label>
            <input matInput formControlName="glow" placeholder="rgba(99,102,241,.4)">
          </mat-form-field>
        </div>

        <mat-form-field>
          <mat-label>Border</mat-label>
          <input matInput formControlName="border" placeholder="rgba(99,102,241,.3)">
        </mat-form-field>

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
export class ProjectFormComponent implements OnInit {
  readonly data      = inject<Project | null>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ProjectFormComponent>);
  readonly fb        = inject(NonNullableFormBuilder);

  readonly isEdit    = !!this.data?.id;
  readonly categories = CATEGORIES;

  readonly form = this.fb.group({
    title:        ['', Validators.required],
    description:  ['', Validators.required],
    category:     ['angular', Validators.required],
    categoryName: ['Angular'],
    displayOrder: [1],
    image:        ['', Validators.required],
    liveLink:     ['', Validators.required],
    githubLink:   [''],
    color:        ['#c084fc'],
    glow:         ['rgba(168,85,247,.4)'],
    border:       ['rgba(168,85,247,.3)'],
  });

  ngOnInit() {
    if (this.data) this.form.patchValue(this.data);
  }

  onCategoryChange(id: string) {
    const cat = CATEGORIES.find(c => c.id === id);
    if (cat) this.form.patchValue({ categoryName: cat.name });
  }

  submit() {
    if (this.form.invalid) return;
    const result = {
      ...(this.isEdit ? { id: this.data!.id } : {}),
      ...this.form.getRawValue(),
    };
    this.dialogRef.close(result);
  }
}
