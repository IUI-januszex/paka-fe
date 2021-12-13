import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorServiceService implements HttpInterceptor {
  constructor(private router: Router) { }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
request = request.clone({
withCredentials: true
});

return next.handle(request).pipe(tap(() => { },
(err: any) => {
  if (err instanceof HttpErrorResponse) {
    if (err.status !== 401) {
      return;
    }
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }
}));
}
}

