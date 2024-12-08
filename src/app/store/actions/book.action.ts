import { createAction, props } from '@ngrx/store';
import { Book, PageableObject, PageBook } from '../../../../libs/generated-api/src';

//create
export const createForm = createAction('[Form] Create Form', props<{ formData: Book }>());
export const createFormSuccess = createAction('[Form] Create Form Success', props<{ data: Book }>());
export const createFormFailure = createAction('[Form] Create Form Failure', props<{ error: any }>());


//update
export const updateForm = createAction('[Form] Update Form', props<{ formData: Book }>());
export const updateFormSuccess = createAction('[Form] Update Form Success', props<{ data: Book }>());
export const updateFormFailure = createAction('[Form] Update Form Failure', props<{ error: any }>());

// Delete
export const deleteBook = createAction('[Book] Delete Books', props<{ id: string }>());
export const deleteBookSuccess = createAction('[Book] Delete Books Success', props<{ id: string }>());
export const deleteBookFailure = createAction('[Book] Delete Books Failure', props<{ error: any }>());

// List
export const getBooks = createAction('[Book] Get Books', props<{ data: PageableObject }>());
export const getBooksSuccess = createAction('[Book] Get Books Success', props<{ data: PageBook }>());
export const getBooksFailure = createAction('[Book] Get Books Failure', props<{ error: any }>());


// Detail
export const getBookDetail = createAction('[Book] Get Book Detail', props<{ id: string }>());
export const getBookDetailSuccess = createAction('[Book] Get Book Details Success', props<{ data: Book }>());
export const getBookDetailFailure = createAction('[Book] Get Book Details Failure', props<{ error: any }>());


//success
export const successForm = createAction('[Form] Success Form', props<{ data: boolean }>());
