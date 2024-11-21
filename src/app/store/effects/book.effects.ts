import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BookControllerService } from '../../../../libs/generated-api/src';  // Import UserService được tạo từ OpenAPI
import { submitForm, submitFormSuccess, submitFormFailure } from '../actions/book.action'; // Import action

@Injectable()
export class BookEffects {
  readonly #actions = inject(Actions);
  readonly #bookControllerService = inject(BookControllerService);

  submitForm$ = createEffect(() =>
    this.#actions.pipe(
      ofType(submitForm),
      tap((action) => console.log('Action received:', action)), // Log thông tin action
      mergeMap((action) =>
        this.#bookControllerService.createBook(action.formData).pipe( // Gọi API tạo user
          map(() => submitFormSuccess()),
          catchError((error) => of(submitFormFailure({ error })))
        )
      )
    )
  );
}
