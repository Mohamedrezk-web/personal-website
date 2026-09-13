import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Project } from '../core/models';
import { ApiService } from '../core/services/api.service';

interface State { loading: boolean; error: string | null; }

export const ProjectsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Project>(),
  withState<State>({ loading: false, error: null }),

  withMethods((store, api = inject(ApiService)) => ({

    loadAll: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, { loading: true, error: null });
        return api.getPortfolio().pipe(
          tapResponse({
            next:  (res) => patchState(store, setAllEntities(res.projects), { loading: false }),
            error: (e: Error) => patchState(store, { error: e.message, loading: false }),
          })
        );
      })
    )),

    create(project: Omit<Project, 'id'>) {
      return api.createProject(project).pipe(
        tap((created) => patchState(store, addEntity(created)))
      );
    },

    update(project: Project) {
      return api.updateProject(project).pipe(
        tap((updated) => patchState(store, updateEntity({ id: updated.id, changes: updated })))
      );
    },

    remove(id: string) {
      return api.deleteProject(id).pipe(
        tap(() => patchState(store, removeEntity(id)))
      );
    },
  }))
);
