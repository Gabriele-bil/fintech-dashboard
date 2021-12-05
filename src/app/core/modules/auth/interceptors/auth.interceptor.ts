import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthFacade } from "../../../store/auth/auth.facade";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.authFacade.clearUser();
        }
        return throwError(err);
      })
    );
  }
}
