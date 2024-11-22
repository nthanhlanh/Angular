import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitForm } from '../../store/actions/book.action'; // Action gửi form
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Book } from '../../../../libs/generated-api/src';
import { bookForm } from './boot-form';


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

  public readonly form = bookForm;
  readonly loading$: Observable<boolean> = this.#store.select('form', 'loading');// Tạo selector cho trạng thái loading
  readonly success$: Observable<boolean> = this.#store.select('form', 'success');// Tạo selector cho trạng thái success

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      // Lấy giá trị form và dispatch action submit form
      const formData = this.form.value as Book; // Đảm bảo dữ liệu đúng kiểu
      this.#store.dispatch(submitForm({ formData }));
    }
  }
}
