import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BookControllerService } from '../../../../libs/generated-api/src';  // Import UserService được tạo từ OpenAPI
import { submitForm, submitFormSuccess, submitFormFailure, getBooks, getBooksSuccess, getBooksFailure } from '../actions/book.action'; // Import action

@Injectable()
export class BookEffects {
  readonly #actions = inject(Actions);
  readonly #bookControllerService = inject(BookControllerService);

  submitForm$ = createEffect(() =>
    this.#actions.pipe(
      ofType(submitForm),
      tap((action) => console.log('Action received:', action)), // Log action khi nhận được
      mergeMap((action) =>
        this.#bookControllerService.createBook(action.formData).pipe( // Gọi API tạo book
          tap((response) => console.log('response received:', response)), // Log action khi nhận được
          map((response) => submitFormSuccess({data:response})),  // Chuyển dữ liệu trả về vào action submitFormSuccess
          catchError((error) => of(submitFormFailure({ error })))  // Xử lý lỗi và tạo action thất bại
        )
      )
    )
  );

  fetchBooks$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getBooks),
      mergeMap((action) =>
        this.#bookControllerService.getAllBooks({ page: action.data.pageNumber, size: action.data.pageSize }).pipe( // Gọi API lấy danh sách sách
          map((response) => getBooksSuccess({ data: response })), // Dispatch action thành công
          catchError((error) => of(getBooksFailure({ error }))) // Xử lý lỗi
        )
      )
    )
  );
  
  
}
