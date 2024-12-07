import { createReducer, on } from '@ngrx/store';
import { createFormSuccess, createFormFailure, getBooksSuccess, updateFormSuccess, updateFormFailure, successForm } from '../actions/book.action';
import { Book } from '../../../../libs/generated-api/src';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface BookState extends EntityState<Book> {
  totalElements?: number;
  totalPages?: number;
  loading: boolean;
  success: boolean;
  error: any;
}

export function selectBookId(book: Book): string {
  return book.id ?? "id-text";
}

export const bookAdapter = createEntityAdapter<Book>({
  selectId: selectBookId,  // Chỉ định 'bookId' làm khóa chính
});

export const initialBookState: BookState = bookAdapter.getInitialState({
  totalElements: 0,
  totalPages: 0,
  loading: false,
  success: false,
  error: null
});

export const bookReducer = createReducer(
  initialBookState,

  on(getBooksSuccess, (state, action) => {
    return bookAdapter.setAll(action.data.content ?? [], {
      ...state,
      totalElements: action.data.totalElements,
      totalPages: action.data.totalPages,
      loading: false,
    });
  }),

  // create
  on(createFormSuccess, (state, { data }) => {
    return bookAdapter.upsertOne(data, {
      ...state,
      success: true
    });
  }),
  on(createFormFailure, (state, { error }) => ({
    ...state,
    success: false,
    error
  })),

  // update
  on(updateFormSuccess, (state, { data }) => {
    return bookAdapter.upsertOne(data, {
      ...state,
      success: true
    });
  }),
  on(updateFormFailure, (state, { error }) => ({
    ...state,
    success: false,
    error
  })),

  // success
  on(successForm, (state, { data }) => ({
    ...state,
    success: data,
  })),
);

// Các selectors được cung cấp tự động bởi adapter
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = bookAdapter.getSelectors();
