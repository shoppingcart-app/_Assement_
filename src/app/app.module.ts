import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from './error-handler.service'; // Import the custom error handler service
import { HttpErrorInterceptor } from './http-error.interceptor'; // Import the HTTP error interceptor
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // Add HttpClientModule for HTTP requests
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, // Provide the custom error handler
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true } // Provide the HTTP interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
