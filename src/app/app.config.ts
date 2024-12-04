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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const isProduction = false;

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
    // Import StoreDevtoolsModule thông qua importProvidersFrom
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,  // Tối đa 25 action được lưu trữ trong DevTools
        logOnly: isProduction,  // Chỉ bật logging trong môi trường production
      })
    ),
  ],
};
