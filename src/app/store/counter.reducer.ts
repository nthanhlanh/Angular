import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Counter } from './counter.model';  // Import Counter model
import { increment, decrement, reset } from './counter.actions';

// Bước 1: Tạo Entity Adapter cho Counter
export const adapter: EntityAdapter<Counter> = createEntityAdapter<Counter>();

// Bước 2: Định nghĩa trạng thái với EntityState
export interface CounterState extends EntityState<Counter> {}

// Bước 3: Tạo một Counter mẫu
const initialCounter: Counter = { id: 1, value: 10 };

// Bước 4: Trạng thái khởi tạo (sử dụng getInitialState của adapter)
export const initialState: CounterState = adapter.getInitialState({
  entities: {
    [initialCounter.id]: initialCounter
  },
  ids: [initialCounter.id]
});

// Bước 5: Tạo reducer với createReducer
const _counterReducer = createReducer(
  initialState,
  on(increment, (state, { id }) => {
    const currentCounter = state.entities[id];
    if (currentCounter) {
      return adapter.updateOne({
        id: id,
        changes: { value: currentCounter.value + 1 }
      }, state);
    }
    return state;
  }),
  on(decrement, (state, { id }) => {
    const currentCounter = state.entities[id];
    if (currentCounter) {
      return adapter.updateOne({
        id: id,
        changes: { value: currentCounter.value - 1 }
      }, state);
    }
    return state;
  }),
  on(reset, (state, { id }) => {
    const currentCounter = state.entities[id];
    if (currentCounter) {
      return adapter.updateOne({
        id: id,
        changes: { value: 0 }
      }, state);
    }
    return state;
  })
);
console.log('Initial State:', initialState);

// Export hàm reducer
export function counterReducer(state: CounterState | undefined, action: any) {
  return _counterReducer(state, action);
}
