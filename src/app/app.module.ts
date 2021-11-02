import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { SignInComponent } from './views/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register.component';
import { LoginComponent } from './views/login.component';
import { CardListComponent } from './views/card-list.component';
import { CardFormComponent } from './views/card-form.component';
import { CardsComponent } from './views/cards.component';
import { MovementComponent } from './views/movement.component';
import { MovementsComponent } from './views/movements.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { MovementInOutDirective } from './shared/directives/movement-in-out.directive';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent,
    MovementComponent,
    MovementsComponent,
    TruncatePipe,
    MovementInOutDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
