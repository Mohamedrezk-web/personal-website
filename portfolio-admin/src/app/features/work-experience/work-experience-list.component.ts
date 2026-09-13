import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WorkExperience } from '../../core/models';
import { WorkExperienceStore } from '../../store/work-experience.store';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { WorkExperienceFormComponent } from './work-experience-form.component';

@Component({
  selector: 'app-work-experience-list',
  standalone: true,
  imports: [
    MatTableModule, MatButtonModule, MatIconModule,
    MatProgressBarModule, MatTooltipModule,
  ],
  styles: [`
    .table-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #1e2d4a; }
    .col-company { font-weight: 600; color: #e8edf8; }
    .col-period  { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #4b5679; }
    .col-stack   { max-width: 260px; }
    .actions     { display: flex; gap: 4px; }
    mat-progress-bar { margin-bottom: 8px; }
  `],
  template: `
    @if (store.loading()) {
      <mat-progress-bar mode="indeterminate" />
    }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Work Experience</h1>
      <button mat-flat-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon> Add Entry
      </button>
    </div>

    <div class="table-wrap">
      <table mat-table [dataSource]="store.entities()">

        <ng-container matColumnDef="company">
          <th mat-header-cell *matHeaderCellDef>Company</th>
          <td mat-cell *matCellDef="let row">
            <span class="col-company">{{ row.company }}</span>
            @if (row.current) { <span class="current-badge">Current</span> }
          </td>
        </ng-container>

        <ng-container matColumnDef="position">
          <th mat-header-cell *matHeaderCellDef>Position</th>
          <td mat-cell *matCellDef="let row">{{ row.position }}</td>
        </ng-container>

        <ng-container matColumnDef="period">
          <th mat-header-cell *matHeaderCellDef>Period</th>
          <td mat-cell *matCellDef="let row" class="col-period">{{ row.period }}</td>
        </ng-container>

        <ng-container matColumnDef="stack">
          <th mat-header-cell *matHeaderCellDef>Stack</th>
          <td mat-cell *matCellDef="let row" class="col-stack">
            @for (tag of row.stack.split(',').slice(0, 4); track tag) {
              <span class="chip">{{ tag.trim() }}</span>
            }
            @if (row.stack.split(',').length > 4) {
              <span class="chip" style="color:#4b5679">+{{ row.stack.split(',').length - 4 }}</span>
            }
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let row">
            <div class="actions">
              <button mat-icon-button matTooltip="Edit" (click)="openForm(row)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button matTooltip="Delete" color="warn" (click)="confirmDelete(row)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
    </div>
  `,
})
export class WorkExperienceListComponent implements OnInit {
  readonly store   = inject(WorkExperienceStore);
  readonly dialog  = inject(MatDialog);
  readonly snack   = inject(MatSnackBar);

  readonly columns = ['company', 'position', 'period', 'stack', 'actions'];

  ngOnInit() { this.store.loadAll(); }

  openForm(item?: WorkExperience) {
    const ref = this.dialog.open(WorkExperienceFormComponent, {
      width: '680px',
      data: item ?? null,
    });

    ref.afterClosed().subscribe((result: WorkExperience | Omit<WorkExperience, 'id'> | undefined) => {
      if (!result) return;

      const action$ = 'id' in result && result.id
        ? this.store.update(result as WorkExperience)
        : this.store.create(result as Omit<WorkExperience, 'id'>);

      action$.subscribe({
        next:  () => this.snack.open('Saved successfully', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
      });
    });
  }

  confirmDelete(item: WorkExperience) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title:   'Delete entry',
        message: `Remove "${item.company} — ${item.position}"? This cannot be undone.`,
      },
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.store.remove(item.id).subscribe({
        next:  () => this.snack.open('Deleted', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to delete', 'OK', { duration: 4000 }),
      });
    });
  }
}
