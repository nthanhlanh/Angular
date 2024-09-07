import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule nếu cần
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Counter } from './store/counter.model';  // Import model
import { increment, decrement, reset } from './store/counter.actions';
import { selectAllCounters, selectCounterState } from './store/counter.selectors';  // Selector

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Đánh dấu component là standalone
  imports: [CommonModule]  // Thêm các module cần thiết, ví dụ CommonModule
})
export class AppComponent implements OnInit {
  counters$!: Observable<Counter[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Sử dụng selector để lấy tất cả các counter
    this.store.select(selectCounterState).subscribe(state => {
      console.log('Current State:', state);  // Log state để kiểm tra
    });
    this.counters$ = this.store.select(selectAllCounters);

  }

  increment(id: number) {
    this.store.dispatch(increment({ id }));
  }

  decrement(id: number) {
    this.store.dispatch(decrement({ id }));
  }

  reset(id: number) {
    this.store.dispatch(reset({ id }));
  }
}
