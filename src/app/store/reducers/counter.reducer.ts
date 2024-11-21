import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/counter.actions';

// Định nghĩa trạng thái ban đầu
export const initialState = 0;

// Tạo reducer để xử lý các action
export const counterReducer = createReducer(
  initialState,
  on(increment, state => state + 1),  // Khi action increment được gọi, tăng state lên 1
  on(decrement, state => state - 1),  // Khi action decrement được gọi, giảm state xuống 1
  on(reset, () => 0)  // Khi action reset được gọi, reset về 0
);
