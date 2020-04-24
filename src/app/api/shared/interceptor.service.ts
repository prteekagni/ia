import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     this.sharedService.loadingControllerDisplay();
    request = request.clone({
      headers: request.headers.set("Access-Control-Allow-Origin", "*"),
    });
    return next
      .handle(request)
      .pipe(finalize(() => this.sharedService.dismissLoadingController()));
  }
}
