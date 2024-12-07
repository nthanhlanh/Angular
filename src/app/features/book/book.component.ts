import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getBooks, submitForm } from '../../store/actions/book.action'; // Action gửi form
import { map, Observable, of, withLatestFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../libs/generated-api/src';
import { bookForm } from './boot-form';
import { selectBookEntities } from '../../store';
import { Dictionary } from '@ngrx/entity';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  readonly #store = inject(Store);

  showForm = false;
  paginatedItems: any[] = [];
  currentPage = 0;
  itemsPerPage = 10;

  public readonly form = bookForm;
  readonly loading$: Observable<boolean> = this.#store.select('book', 'loading');// Tạo selector cho trạng thái loading
  readonly success$: Observable<boolean> = this.#store.select('book', 'success');// Tạo selector cho trạng thái success
  readonly totalPages$: Observable<number> = this.#store.select('book', 'totalPages');// Tạo selector cho trạng thái totalPages
  readonly items$: Observable<Book[]> = this.#store.select(selectBookEntities).pipe(
    map((entities: Dictionary<Book>) => Object.values(entities).filter((book): book is Book => book !== undefined)) // Convert dictionary to an array
  );

  ngOnInit() {
    this.#store.dispatch(getBooks({data:{pageNumber:0,pageSize:10}}));
  }

  onSubmit() {
    if (this.form.valid) {
      // Lấy giá trị form và dispatch action submit form
      const formData = this.form.value as Book; // Đảm bảo dữ liệu đúng kiểu
      this.#store.dispatch(submitForm({ formData }));
      
    }
  }

  onDetail(){
    const books: Observable<Book | null>=this.#store.select(selectBookEntities);
    books.subscribe((books) => {
      console.log(books);  // Log dữ liệu từ Observable
    });
  }

  onAddNew(): void {
    this.showForm = !this.showForm;
  }

  changePage(direction: 'prev' | 'next'): void {
    this.totalPages$
    .pipe(
      withLatestFrom(of(this.currentPage)),
      map(([totalPages, currentPage]) => {
        if (direction === 'prev' && currentPage > 0) {
          return currentPage - 1;
        } else if (direction === 'next' && currentPage < totalPages) {
          return currentPage + 1;
        }
        return currentPage;
      })
    )
    .subscribe(newPage => {
      this.currentPage = newPage;
      this.#store.dispatch(getBooks({ data: { pageNumber: this.currentPage, pageSize: 10 } }));
    });
  }

  onEdit(item: any): void {
    // You can implement the logic for editing an item.
    console.log('Edit item:', item);
  }

  onDelete(item: any): void {
    // const index = this.items.indexOf(item);
    // if (index > -1) {
    //   this.items.splice(index, 1);
    //   this.paginateItems(); // Recalculate pagination after deletion
    // }
  }

}
