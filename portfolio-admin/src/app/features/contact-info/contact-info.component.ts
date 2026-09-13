import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ContactInfoStore } from '../../store/contact-info.store';
import { ContactInfoItem } from '../../core/models';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTableModule,
  ],
  styles: [`
    .card { background: #0f172a; border: 1px solid #1e2d4a; border-radius: 8px; padding: 16px; margin-top: 16px; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    mat-form-field { width: 100%; }
    .item-table-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #1e2d4a; margin-top: 16px; }
    .actions { display: flex; gap: 4px; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Contact Info</h1>
      <button mat-flat-button color="primary" (click)="saveAll()" [disabled]="store.loading()">
        <mat-icon>save</mat-icon> Save All
      </button>
    </div>

    @if (store.data()) {
      <div class="card">
        <p style="color:#4b5679;font-size:13px;margin:0 0 12px">Contact info items shown on the contact section</p>

        <div class="item-table-wrap">
          <table mat-table [dataSource]="store.data()!.items">
            <ng-container matColumnDef="icon">
              <th mat-header-cell *matHeaderCellDef>Icon</th>
              <td mat-cell *matCellDef="let row">{{ row.icon }}</td>
            </ng-container>
            <ng-container matColumnDef="label">
              <th mat-header-cell *matHeaderCellDef>Label</th>
              <td mat-cell *matCellDef="let row" style="font-weight:600;color:#e8edf8">{{ row.label }}</td>
            </ng-container>
            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef>Value</th>
              <td mat-cell *matCellDef="let row" style="font-family:monospace;font-size:12px;color:#4b5679">{{ row.value }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row; let i = index">
                <div class="actions">
                  <button mat-icon-button (click)="editItem(i, row)"><mat-icon>edit</mat-icon></button>
                  <button mat-icon-button color="warn" (click)="removeItem(i)"><mat-icon>delete</mat-icon></button>
                </div>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="['icon','label','value','actions']"></tr>
            <tr mat-row *matRowDef="let row; columns: ['icon','label','value','actions']"></tr>
          </table>
        </div>

        <div style="margin-top:16px">
          <p style="color:#4b5679;font-size:12px;margin:0 0 8px">Add / Edit Item</p>
          <form [formGroup]="itemForm" style="display:flex;flex-direction:column;gap:12px;">
            <div class="row">
              <mat-form-field>
                <mat-label>Label</mat-label>
                <input matInput formControlName="label" placeholder="Email">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Icon (Material or emoji)</mat-label>
                <input matInput formControlName="icon" placeholder="email">
              </mat-form-field>
            </div>
            <div class="row">
              <mat-form-field>
                <mat-label>Value</mat-label>
                <input matInput formControlName="value" placeholder="me@example.com">
              </mat-form-field>
              <mat-form-field>
                <mat-label>Color</mat-label>
                <input matInput formControlName="color" placeholder="#818cf8">
              </mat-form-field>
            </div>
            <div style="display:flex;gap:8px">
              <button mat-stroked-button type="button" (click)="upsertItem()" [disabled]="itemForm.invalid">
                {{ editingIndex() !== null ? 'Update Item' : 'Add Item' }}
              </button>
              @if (editingIndex() !== null) {
                <button mat-button type="button" (click)="cancelEdit()">Cancel</button>
              }
            </div>
          </form>
        </div>
      </div>
    }
  `,
})
export class ContactInfoComponent implements OnInit {
  readonly store = inject(ContactInfoStore);
  readonly snack = inject(MatSnackBar);
  readonly fb    = inject(NonNullableFormBuilder);

  readonly editingIndex = signal<number | null>(null);

  readonly itemForm = this.fb.group({
    label: ['', Validators.required],
    icon:  [''],
    value: ['', Validators.required],
    color: ['#818cf8'],
  });

  ngOnInit() { this.store.load(); }

  editItem(index: number, item: ContactInfoItem) {
    this.editingIndex.set(index);
    this.itemForm.patchValue(item);
  }

  cancelEdit() {
    this.editingIndex.set(null);
    this.itemForm.reset({ color: '#818cf8' });
  }

  upsertItem() {
    if (this.itemForm.invalid || !this.store.data()) return;
    const items = [...(this.store.data()!.items ?? [])];
    const val = this.itemForm.getRawValue() as ContactInfoItem;
    const idx = this.editingIndex();
    if (idx !== null) {
      items[idx] = val;
    } else {
      items.push(val);
    }
    this.store.patchLocal({ ...this.store.data()!, items });
    this.cancelEdit();
  }

  removeItem(index: number) {
    if (!this.store.data()) return;
    const items = this.store.data()!.items.filter((_, i) => i !== index);
    this.store.patchLocal({ ...this.store.data()!, items });
  }

  saveAll() {
    if (!this.store.data()) return;
    this.store.update(this.store.data()!).subscribe({
      next:  () => this.snack.open('Contact info saved', 'OK', { duration: 3000 }),
      error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
    });
  }
}
