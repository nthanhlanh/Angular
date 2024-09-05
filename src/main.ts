import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { counterReducer } from './app/store/counter.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';  // Import Devtools
import { importProvidersFrom } from '@angular/core'; // Import provider utility

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ count: counterReducer }),
  ]
}).catch(err => console.error(err));
