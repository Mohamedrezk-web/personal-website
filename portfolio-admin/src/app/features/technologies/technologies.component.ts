import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TechnologiesStore } from '../../store/technologies.store';
import { TechnologySection } from '../../core/models';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressBarModule,
    MatChipsModule, MatExpansionModule,
  ],
  styles: [`
    .categories { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
    .cat-header { display: flex; align-items: center; gap: 8px; }
    .cat-label { font-weight: 600; color: #e8edf8; flex: 1; }
    .tech-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .tech-chip { display: flex; align-items: center; gap: 4px; background: #1e2d4a; border-radius: 4px; padding: 4px 8px; font-size: 13px; }
    .tech-chip button { background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; line-height: 1; }
    .add-row { display: flex; gap: 8px; align-items: flex-start; margin-top: 8px; }
    .add-row mat-form-field { flex: 1; }
    .panel-body { padding: 8px 16px 16px; }
    .meta-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px; }
    mat-expansion-panel { background: #0f172a; border: 1px solid #1e2d4a; border-radius: 8px !important; }
    mat-panel-title { color: #e8edf8; }
  `],
  template: `
    @if (store.loading()) { <mat-progress-bar mode="indeterminate" /> }

    <div class="action-bar">
      <h1 class="page-title" style="margin:0">Technologies</h1>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="store.loading()">
        <mat-icon>save</mat-icon> Save All
      </button>
    </div>

    @if (store.data()) {
      <div class="categories">
        <mat-accordion multi>
          @for (cat of categoryKeys(); track cat) {
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>{{ cat }}</mat-panel-title>
                <mat-panel-description style="color:#4b5679">
                  {{ categoryItems(cat).length }} technologies
                </mat-panel-description>
              </mat-expansion-panel-header>

              <div class="panel-body">
                <div class="tech-list">
                  @for (tech of categoryItems(cat); track tech) {
                    <div class="tech-chip">
                      {{ tech }}
                      <button (click)="removeTech(cat, tech)">×</button>
                    </div>
                  }
                </div>

                <div class="add-row">
                  <mat-form-field>
                    <mat-label>Add technology</mat-label>
                    <input matInput #addInput
                      (keydown.enter)="addTech(cat, addInput); addInput.value = ''"
                      placeholder="e.g. React 19">
                  </mat-form-field>
                  <button mat-stroked-button (click)="addTech(cat, addInput); addInput.value = ''">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>

                @if (store.data()?.categoryMeta?.[cat]; as meta) {
                  <div class="meta-row">
                    <mat-form-field>
                      <mat-label>Emoji / Icon</mat-label>
                      <input matInput [value]="meta.emoji"
                        (input)="updateMeta(cat, 'emoji', $any($event.target).value)">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label>Color</mat-label>
                      <input matInput [value]="meta.color"
                        (input)="updateMeta(cat, 'color', $any($event.target).value)">
                    </mat-form-field>
                    <mat-form-field>
                      <mat-label>Glow</mat-label>
                      <input matInput [value]="meta.glow"
                        (input)="updateMeta(cat, 'glow', $any($event.target).value)">
                    </mat-form-field>
                  </div>
                }
              </div>
            </mat-expansion-panel>
          }
        </mat-accordion>
      </div>
    }
  `,
})
export class TechnologiesComponent implements OnInit {
  readonly store = inject(TechnologiesStore);
  readonly snack = inject(MatSnackBar);

  readonly categoryKeys = computed(() =>
    Object.keys(this.store.data()?.categories ?? {})
  );

  categoryItems(cat: string): string[] {
    return this.store.data()?.categories[cat] ?? [];
  }

  ngOnInit() { this.store.load(); }

  private cloneData(): TechnologySection {
    const d = this.store.data()!;
    return {
      ...d,
      categories: { ...Object.fromEntries(Object.entries(d.categories).map(([k, v]) => [k, [...v]])) },
      categoryMeta: { ...Object.fromEntries(Object.entries(d.categoryMeta).map(([k, v]) => [k, { ...v }])) },
    };
  }

  addTech(cat: string, input: HTMLInputElement) {
    const val = input.value.trim();
    if (!val || !this.store.data()) return;
    const draft = this.cloneData();
    draft.categories[cat] = [...(draft.categories[cat] ?? []), val];
    this.store.patchLocal(draft);
  }

  removeTech(cat: string, tech: string) {
    if (!this.store.data()) return;
    const draft = this.cloneData();
    draft.categories[cat] = draft.categories[cat].filter(t => t !== tech);
    this.store.patchLocal(draft);
  }

  updateMeta(cat: string, field: 'emoji' | 'color' | 'glow', value: string) {
    if (!this.store.data()) return;
    const draft = this.cloneData();
    draft.categoryMeta[cat] = { ...draft.categoryMeta[cat], [field]: value };
    this.store.patchLocal(draft);
  }

  save() {
    if (!this.store.data()) return;
    this.store.update(this.store.data()!).subscribe({
      next:  () => this.snack.open('Technologies saved', 'OK', { duration: 3000 }),
      error: () => this.snack.open('Failed to save', 'OK', { duration: 4000 }),
    });
  }
}
