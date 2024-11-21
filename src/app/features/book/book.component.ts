import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitForm } from '../../store/actions/book.action'; // Action gửi form
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
export class BookComponent implements OnInit{
  readonly #store = inject(Store);
  readonly #fb = inject(FormBuilder);

  form!: FormGroup;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;

  constructor() {
    this.loading$ = this.#store.select('form', 'loading');  // Tạo selector cho trạng thái loading
    this.success$ = this.#store.select('form', 'success');  // Tạo selector cho trạng thái success
  }

  ngOnInit() {
    this.form = this.#fb.group({
      name: ['', Validators.required],  // Trường name
      author: ['', Validators.required]  // Trường author
    });
  }

  onSubmit() {
    console.log(222)
    if (this.form.valid) {
      console.log(1111)
      // Lấy giá trị form và dispatch action submit form
      this.#store.dispatch(submitForm({ formData: this.form.value }));
    }
  }
}
