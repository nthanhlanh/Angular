import { createSelector } from '@ngrx/store';

// Chọn state từ store
export const selectCounter = (state: any) => state.counter;

// Tạo selector cho Counter
export const selectCounterValue = createSelector(
  selectCounter,
  (state: number) => state
);
