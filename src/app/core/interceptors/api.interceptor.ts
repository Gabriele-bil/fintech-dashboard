import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, delay } from 'rxjs/operators';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackBarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const options = {
      url: `${ environment.apiUrl }${ request.url }`,
      withCredentials: true
    };
    if (!request.url.includes('http')) {
      request = request.clone(options);
    }
    return next.handle(request).pipe(
      delay(1500),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status !== 401) {
          try {
            this.snackBarService.openDefaultSnackBar(err.error.error);
          } catch (e) {
            this.snackBarService.openDefaultSnackBar("Ops qualcosa è andato storto")
          }
        }
        return throwError(err);
      })
    );
  }
}
