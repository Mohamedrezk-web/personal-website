import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { WorkExperience } from '../core/models';
import { ApiService } from '../core/services/api.service';

interface State { loading: boolean; error: string | null; }

export const WorkExperienceStore = signalStore(
  { providedIn: 'root' },
  withEntities<WorkExperience>(),
  withState<State>({ loading: false, error: null }),

  withMethods((store, api = inject(ApiService)) => ({

    loadAll: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, { loading: true, error: null });
        return api.getExperience().pipe(
          tapResponse({
            next:  (items) => patchState(store, setAllEntities(items), { loading: false }),
            error: (e: Error) => patchState(store, { error: e.message, loading: false }),
          })
        );
      })
    )),

    create(item: Omit<WorkExperience, 'id'>) {
      return api.createExperience(item).pipe(
        tap((created) => patchState(store, addEntity(created)))
      );
    },

    update(item: WorkExperience) {
      return api.updateExperience(item).pipe(
        tap((updated) => patchState(store, updateEntity({ id: updated.id, changes: updated })))
      );
    },

    remove(id: string) {
      return api.deleteExperience(id).pipe(
        tap(() => patchState(store, removeEntity(id)))
      );
    },
  }))
);
