import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular2024';
  readonly #router = inject(Router);

  // Phương thức điều hướng đến trang khác khi người dùng click vào menu
  navigateTo(route: string) {
    this.#router.navigate([route]);  // Điều hướng đến đường dẫn tương ứng
  }

  isActive(path: string): boolean {
    return this.#router.url === path;
  }
}
