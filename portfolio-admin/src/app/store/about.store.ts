import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { AboutSection } from '../core/models';
import { ApiService } from '../core/services/api.service';

interface State { data: AboutSection | null; loading: boolean; error: string | null; }

export const AboutStore = signalStore(
  { providedIn: 'root' },
  withState<State>({ data: null, loading: false, error: null }),

  withMethods((store, api = inject(ApiService)) => ({

    load: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, { loading: true, error: null });
        return api.getAbout().pipe(
          tapResponse({
            next:  (data) => patchState(store, { data, loading: false }),
            error: (e: Error) => patchState(store, { error: e.message, loading: false }),
          })
        );
      })
    )),

    update(about: AboutSection) {
      return api.updateAbout(about).pipe(
        tap((data) => patchState(store, { data }))
      );
    },
  }))
);
