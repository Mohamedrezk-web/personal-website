import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { ContactMessagesStore } from '../../store/contact-messages.store';
import { ContactMessage } from '../../core/models';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule, DatePipe],
  styles: [`
    .table-wrap { border-radius: 8px; overflow: hidden; border: 1px solid #1e2d4a; }
    .col-name { font-weight: 600; color: #e8edf8; }
    .col-email { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #38bdf8; }
    .col-message { max-width: 360px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #4b5679; font-size: 13px; }
    .col-time { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #4b5679; }
    .actions { display: flex; gap: 4px; }
    .empty { padding: 32px; text-align: center; color: #4b5679; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Inbox</h1>
      <span style="color:#4b5679;font-size:13px">{{ store.entities().length }} messages</span>
    </div>

    @if (store.entities().length === 0 && !store.loading()) {
      <div class="empty">
        <mat-icon style="font-size:48px;height:48px;width:48px;color:#1e2d4a">inbox</mat-icon>
        <p>No messages yet</p>
      </div>
    } @else {
      <div class="table-wrap">
        <table mat-table [dataSource]="store.entities()">

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let row" class="col-name">{{ row.name }}</td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let row" class="col-email">{{ row.email }}</td>
          </ng-container>

          <ng-container matColumnDef="message">
            <th mat-header-cell *matHeaderCellDef>Message</th>
            <td mat-cell *matCellDef="let row" class="col-message" [matTooltip]="row.message">
              {{ row.message }}
            </td>
          </ng-container>

          <ng-container matColumnDef="receivedAt">
            <th mat-header-cell *matHeaderCellDef>Received</th>
            <td mat-cell *matCellDef="let row" class="col-time">
              {{ row.receivedAt | date:'dd MMM yyyy HH:mm' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let row">
              <div class="actions">
                <a mat-icon-button [href]="'mailto:' + row.email" matTooltip="Reply" target="_blank">
                  <mat-icon>reply</mat-icon>
                </a>
                <button mat-icon-button color="warn" matTooltip="Delete" (click)="confirmDelete(row)">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns"></tr>
        </table>
      </div>
    }
  `,
})
export class ContactMessagesComponent implements OnInit {
  readonly store  = inject(ContactMessagesStore);
  readonly dialog = inject(MatDialog);
  readonly snack  = inject(MatSnackBar);

  readonly columns = ['name', 'email', 'message', 'receivedAt', 'actions'];

  ngOnInit() { this.store.loadAll(); }

  confirmDelete(item: ContactMessage) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete message', message: `Remove message from ${item.name}?` },
    }).afterClosed().subscribe((ok: boolean) => {
      if (!ok) return;
      this.store.remove(item.id).subscribe({
        next:  () => this.snack.open('Deleted', 'OK', { duration: 3000 }),
        error: () => this.snack.open('Failed to delete', 'OK', { duration: 4000 }),
      });
    });
  }
}
