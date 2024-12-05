import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState, bookAdapter } from '../reducers/book.reducer';

// Tạo feature selector cho state "form"
export const selectBookState = createFeatureSelector<BookState>('book');

// Selector để lấy tất cả các cuốn sách
export const selectAllBooks = createSelector(
  selectBookState,
  bookAdapter.getSelectors().selectAll  // Lấy tất cả sách từ state
);

// Selector để lấy tất cả các entities sách (dưới dạng đối tượng, không phải mảng)
export const selectBookEntities = createSelector(
  selectBookState,
  bookAdapter.getSelectors().selectEntities  // Lấy tất cả entities từ state (dưới dạng đối tượng)
);

// Selector để lấy các id của các cuốn sách
export const selectAllBookIds = createSelector(
  selectBookState,
  bookAdapter.getSelectors().selectIds  // Lấy tất cả các id sách từ state
);

// Selector để lấy cuốn sách theo `bookId`
export const selectBookById = (bookId: string) => createSelector(
  selectBookEntities,  // Lấy entities sách
  (entities) => entities[bookId]  // Trả về cuốn sách với `bookId` tương ứng
);


// Selector để lấy trạng thái loading
export const selectFormLoading = createSelector(
  selectBookState,
  (state) => state.loading
);

// Selector để lấy trạng thái success
export const selectFormSuccess = createSelector(
  selectBookState,
  (state) => state.success
);

// Selector để lấy lỗi nếu có
export const selectFormError = createSelector(
  selectBookState,
  (state) => state.error
);


export const selectTotalPages = createSelector(
  selectBookState,
  (state) => state.totalPages
);

