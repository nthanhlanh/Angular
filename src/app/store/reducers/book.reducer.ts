import { createReducer, on } from '@ngrx/store';
import { submitForm, submitFormSuccess, submitFormFailure } from '../actions/book.action';
import { Book } from '../../../../libs/generated-api/src';

export interface FormState {
  book: Book,
  loading: boolean;
  success: boolean;
  error: any;
}

export const initialBookState: FormState = {
  book: {},
  loading: false,
  success: false,
  error: null
};

export const bookReducer = createReducer(
  initialBookState,
  on(submitForm, (state) => ({
    ...state,
    loading: true,
    success: false,
    error: null
  })),
  on(submitFormSuccess, (state, { data }) => {
    console.log('Reducer called with response:', data);  
      return {
      ...state,
      loading: false,
      success: true,
      book: data
    };
  }),
  on(submitFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error
  }))
);
