import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, CounterState } from './counter.reducer';

// Lấy toàn bộ state của Counter
export const selectCounterState = createFeatureSelector<CounterState>('counters');

// Sử dụng adapter để tạo selector cho tất cả các entities
export const { selectAll: selectAllCounters } = adapter.getSelectors(selectCounterState);
