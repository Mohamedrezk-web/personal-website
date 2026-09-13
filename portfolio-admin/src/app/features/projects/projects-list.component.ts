import { Component, inject, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Project } from '../../core/models';
import { ProjectsStore } from '../../store/projects.store';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ProjectFormComponent } from './project-form.component';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [SlicePipe, MatTableModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule],
  styles: [`
    .table-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #1e2d4a; }
    .thumb { width: 48px; height: 32px; object-fit: cover; border-radius: 4px; border: 1px solid #1e2d4a; }
    .col-title { font-weight: 600; color: #e8edf8; }
    .actions { display: flex; gap: 4px; }
    .live-link { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #38bdf8; text-decoration: none; }
    .live-link:hover { text-decoration: underline; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Projects</h1>
      <button mat-flat-button color="primary" (click)="openForm()">
        <mat-icon>add</mat-icon> Add Project
      </button>
    </div>

    <div class="table-wrap">
      <table mat-table [dataSource]="store.entities()">

        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef>Preview</th>
          <td mat-cell *matCellDef="let row">
            <img class="thumb" [src]="row.image" [alt]="row.title" loading="lazy">
          </td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let row">
            <span class="col-title">{{ row.title }}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let row">
            <span class="chip">{{ row.categoryName }}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="liveLink">
          <th mat-header-cell *matHeaderCellDef>Live URL</th>
          <td mat-cell *matCellDef="let row">
            <a class="live-link" [href]="row.liveLink" target="_blank" rel="noopener">
              {{ row.liveLink | slice:0:40 }}…
            </a>
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
export class ProjectsListComponent implements OnInit {
  readonly store  = inject(ProjectsStore);
  readonly dialog = inject(MatDialog);
  readonly snack  = inject(MatSnackBar);

  readonly columns = ['image', 'title', 'category', 'liveLink', 'actions'];

  ngOnInit() { this.store.loadAll(); }

  openForm(item?: Project) {
    this.dialog.open(ProjectFormComponent, { width: '680px', data: item ?? null })
      .afterClosed().subscribe((result: Project | Omit<Project, 'id'> | undefined) => {
        if (!result) return;
        const action$ = 'id' in result && result.id
          ? this.store.update(result as Project)
          : this.store.create(result as Omit<Project, 'id'>);
        action$.subscribe({
          next:  () => this.snack.open('Saved', 'OK', { duration: 3000 }),
          error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
        });
      });
  }

  confirmDelete(item: Project) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete project', message: `Remove "${item.title}"?` },
    }).afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.store.remove(item.id).subscribe({
        next:  () => this.snack.open('Deleted', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to delete', 'OK', { duration: 4000 }),
      });
    });
  }
}
