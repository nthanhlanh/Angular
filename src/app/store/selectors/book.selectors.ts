import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from '../reducers/book.reducer';

// Tạo feature selector cho state "form"
export const selectFormState = createFeatureSelector<FormState>('form');

// Selector để lấy trạng thái loading
export const selectFormLoading = createSelector(
  selectFormState,
  (state) => state.loading
);

// Selector để lấy trạng thái success
export const selectFormSuccess = createSelector(
  selectFormState,
  (state) => state.success
);

// Selector để lấy lỗi nếu có
export const selectFormError = createSelector(
  selectFormState,
  (state) => state.error
);
