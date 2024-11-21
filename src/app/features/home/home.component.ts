import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from '../../store';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  counter$: Observable<number>;

  constructor(
    private router: Router,
    private store: Store<{ counter: number }>) { 
    this.counter$ = store.select('counter');  // Lấy giá trị state counter từ store
  } 
  // Phương thức điều hướng đến trang About
  navigateToAbout() {
    this.router.navigate(['/about']);  // Điều hướng đến trang About
  }

  increment() {
    this.store.dispatch(increment());  // Dispatch action increment
  }

  decrement() {
    this.store.dispatch(decrement());  // Dispatch action decrement
  }

  reset() {
    this.store.dispatch(reset());  // Dispatch action reset
  }
}
