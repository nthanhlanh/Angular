import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { increment, incrementSuccess } from '../actions/counter.actions';

@Injectable()
export class CounterEffects {

  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  // Ví dụ về effect thực hiện một hành động bất đồng bộ (API, gọi service, v.v.)
  loadCounter$ = createEffect(() => this.actions$.pipe(
    ofType(increment),
    mergeMap(() => {
        return [incrementSuccess({value:1})]; // Đây là nơi bạn sẽ gọi API hoặc thực hiện hành động bất đồng bộ
    })
  ));
}
