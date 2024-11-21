import { createReducer, on } from '@ngrx/store';
import { submitForm, submitFormSuccess, submitFormFailure } from '../actions/book.action';

export interface FormState {
  loading: boolean;
  success: boolean;
  error: any;
}

export const initialBookState: FormState = {
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
  on(submitFormSuccess, (state) => ({
    ...state,
    loading: false,
    success: true
  })),
  on(submitFormFailure, (state, { error }) => ({
    ...state,
    loading: false,
    success: false,
    error
  }))
);
