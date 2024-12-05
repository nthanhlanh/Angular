import { createAction, props } from '@ngrx/store';
import { Book, PageableObject, PageBook } from '../../../../libs/generated-api/src';

//submit
export const submitForm = createAction('[Form] Submit Form', props<{ formData: Book }>());
export const submitFormSuccess = createAction('[Form] Submit Form Success', props<{ data: Book }>());
export const submitFormFailure = createAction('[Form] Submit Form Failure', props<{ error: any }>());

// List
export const getBooks = createAction('[Book] Get Books', props<{ data: PageableObject }>());
export const getBooksSuccess = createAction('[Book] Get Books Success', props<{ data: PageBook }>());
export const getBooksFailure = createAction('[Book] Get Books Failure', props<{ error: any }>());


// Detail
export const getBookDetails = createAction('[Book] Get Book Details', props<{ bookId: string }>());
export const getBookDetailsSuccess = createAction('[Book] Get Book Details Success', props<{ book: Book }>());
export const getBookDetailsFailure = createAction('[Book] Get Book Details Failure', props<{ error: any }>());
