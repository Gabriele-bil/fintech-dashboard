import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { coreReducer } from "./core/store/core/core.reducer";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { authReducer } from "./core/store/auth/auth.reducer";
import { AuthEffects } from "./core/store/auth/auth.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    CoreModule,
    MatSnackBarModule,
    StoreModule.forRoot({ core: coreReducer, auth: authReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
