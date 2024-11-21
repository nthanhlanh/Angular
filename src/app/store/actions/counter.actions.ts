import { createAction, props } from '@ngrx/store';

// Định nghĩa các action
export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');
export const incrementSuccess = createAction(
    '[Counter] Increment Success',  // Tên action
    props<{ value: number }>()      // Dữ liệu trả về, ví dụ như giá trị sau khi increment
  );
