import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { counterReducer } from './store/reducers/counter.reducer';
import { bookReducer } from './store/reducers/book.reducer';
import { CounterEffects, BookEffects} from './store';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideStore({ 
      counter: counterReducer ,
      book: bookReducer
    }),
    provideEffects([CounterEffects, BookEffects]),
    importProvidersFrom(HttpClientModule),
    
  ],
};
