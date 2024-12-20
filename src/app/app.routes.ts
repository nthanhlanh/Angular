import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { BookComponent } from './features/book/book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Đường dẫn cho Home
  { path: 'about', component: AboutComponent },  // Đường dẫn cho About
  { path: 'contact', component: ContactComponent },  // Đường dẫn cho Contact
  { path: 'book', component: BookComponent }  // Đường dẫn cho Contact
];
