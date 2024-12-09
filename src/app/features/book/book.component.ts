import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createForm, createFormSuccess, deleteBook, deleteBookSuccess, getBooks, successForm, updateForm, updateFormSuccess } from '../../store/actions/book.action'; // Action gửi form
import { map, Observable, of, Subscription, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../libs/generated-api/src';
import { bookForm } from './boot-form';
import { selectBookEntities } from '../../store';
import { Dictionary } from '@ngrx/entity';
import { Actions, ofType } from '@ngrx/effects';


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
  private subscriptions: Subscription = new Subscription();

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


  constructor(private actions$: Actions) { }

  ngOnInit() {
    this.resetForm();
    this.#store.dispatch(getBooks({ data: { pageNumber: 0, pageSize: 10 } }));

    // Subscribe to the success action
    const successSubscription = this.actions$.pipe(
      ofType(createFormSuccess,updateFormSuccess)
    ).subscribe(() => {
      this.onAddNew();
    });

    const deleteSubscription = this.actions$.pipe(
      ofType(deleteBookSuccess),
      switchMap(({ id }) =>
        this.items$.pipe(
          take(1), // Chỉ lấy giá trị hiện tại từ `items$`
          map(items => items.filter(i => i.id !== id)),
          map(filteredItems => {
            if(filteredItems.length == 0){
              this.currentPage--;
            }
            return getBooks({ data: { pageNumber: this.currentPage, pageSize: 10 } })
          })
        )
      ),
      tap(action => this.#store.dispatch(action))
    ).subscribe();
    
    
    

    // // Store the subscription
    this.subscriptions.add(successSubscription);
    this.subscriptions.add(deleteSubscription);
  }

  ngOnDestroy(): void {
    // Cleanup subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      // Lấy giá trị form và dispatch action submit form
      const formData = this.form.value as Book; // Đảm bảo dữ liệu đúng kiểu
      if (formData.id) {
        this.#store.dispatch(updateForm({ formData }));
      } else {
        this.#store.dispatch(createForm({ formData }));
      }
    }
  }

  onDetail() {
    const books: Observable<Book | null> = this.#store.select(selectBookEntities);
    books.subscribe((books) => {
      console.log(books);  // Log dữ liệu từ Observable
    });
  }

  onAddNew(): void {
    this.showForm = !this.showForm;
  }

  onSuccess(): void{
    this.#store.dispatch(successForm({ data: false }));
    
  }

  changePage(direction: 'prev' | 'next'): void {
    this.totalPages$
      .pipe(
        take(1),
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
    this.form.setValue({ id: item.id, name: item.name, author: item.author });
    this.showForm = true;
    this.#store.dispatch(successForm({ data: false }));
  }

  onDelete(item: any): void {
    this.#store.dispatch(deleteBook({ id: item.id }));
    
  }

  resetForm(): void {
    this.form.reset({
      id: undefined, // Đảm bảo reset giá trị id về undefined
      name: '',
      author: ''
    });
    this.showForm = false;
  }

}
