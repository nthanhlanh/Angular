import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BookControllerService } from '../../../../libs/generated-api/src';  // Import UserService được tạo từ OpenAPI
import { createForm, createFormSuccess, createFormFailure, getBooks, getBooksSuccess, getBooksFailure, getBookDetail, getBookDetailSuccess, getBookDetailFailure, updateForm, updateFormSuccess, updateFormFailure, deleteBook, deleteBookSuccess, deleteBookFailure } from '../actions/book.action'; // Import action
import { options } from '../../untils/conts';


@Injectable()
export class BookEffects {
  readonly #actions = inject(Actions);
  readonly #bookControllerService = inject(BookControllerService);

  
  createForm$ = createEffect(() => 
    this.#actions.pipe(
      ofType(createForm),
      // tap((action) => console.log('Action received:', action)), // Log action khi nhận được
      mergeMap((action) =>
        this.#bookControllerService.createBook(action.formData, undefined, undefined, options).pipe( // Gọi API tạo book
          // tap((response) => console.log('response received:', response)), // Log action khi nhận được
          map((response) => createFormSuccess({data:response})),  // Chuyển dữ liệu trả về vào action submitFormSuccess
          catchError((error) => of(createFormFailure({ error })))  // Xử lý lỗi và tạo action thất bại
        )
      )
    )
  );

  updateForm$ = createEffect(() => 
    this.#actions.pipe(
      ofType(updateForm),
      mergeMap((action) =>
        this.#bookControllerService.updateBook(action.formData.id!, action.formData, undefined, undefined, options).pipe( // Gọi API tạo book
          map((response) => updateFormSuccess({data:response})),  // Chuyển dữ liệu trả về vào action submitFormSuccess
          catchError((error) => of(updateFormFailure({ error })))  // Xử lý lỗi và tạo action thất bại
        )
      )
    )
  );

  deleteForm$ = createEffect(() => 
    this.#actions.pipe(
      ofType(deleteBook),
      mergeMap((action) =>
        this.#bookControllerService.deleteBook(action.id!).pipe( // Gọi API tạo book
          map(() => deleteBookSuccess({id:action.id})),
          catchError((error) => of(deleteBookFailure({ error })))
        )
      )
    )
  );

  fetchBooks$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getBooks),
      mergeMap((action) =>
        this.#bookControllerService.getAllBooks({ page: action.data.pageNumber, size: action.data.pageSize }, undefined, undefined, options).pipe( // Gọi API lấy danh sách sách
          map((response) => getBooksSuccess({ data: response })), // Dispatch action thành công
          catchError((error) => of(getBooksFailure({ error }))) // Xử lý lỗi
        )
      )
    )
  );

  fetchBook$ = createEffect(() =>
    this.#actions.pipe(
      ofType(getBookDetail),
      mergeMap((action) =>
        this.#bookControllerService.getBookById(action.id, undefined, undefined, options).pipe( // Gọi API lấy danh sách sách
          map((response) => getBookDetailSuccess({ data: response })), // Dispatch action thành công
          catchError((error) => of(getBookDetailFailure({ error }))) // Xử lý lỗi
        )
      )
    )
  );
  
  
}
