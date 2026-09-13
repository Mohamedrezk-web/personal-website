import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ContactMessage } from '../core/models';
import { ApiService } from '../core/services/api.service';

interface State { loading: boolean; error: string | null; }

export const ContactMessagesStore = signalStore(
  { providedIn: 'root' },
  withEntities<ContactMessage>(),
  withState<State>({ loading: false, error: null }),

  withMethods((store, api = inject(ApiService)) => ({

    loadAll: rxMethod<void>(pipe(
      switchMap(() => {
        patchState(store, { loading: true, error: null });
        return api.getContactMessages().pipe(
          tapResponse({
            next:  (msgs) => patchState(store, setAllEntities(msgs), { loading: false }),
            error: (e: Error) => patchState(store, { error: e.message, loading: false }),
          })
        );
      })
    )),

    remove(id: string) {
      return api.deleteContactMessage(id).pipe(
        tap(() => patchState(store, removeEntity(id)))
      );
    },
  }))
);
