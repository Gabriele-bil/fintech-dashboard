import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
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
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          err.error.error
            ? this.snackBarService.openDefaultSnackBar(err.error.error)
            : this.snackBarService.openDefaultSnackBar(err.message);
        }
        return throwError(err);
      })
    );
  }
}
