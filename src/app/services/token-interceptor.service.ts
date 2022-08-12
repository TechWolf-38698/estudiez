import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError, catchError, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = this.AddTokenHeader(req, authService.getToken() || '');
    return next.handle(tokenizedReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.handleRefreshToken(req, next);
        }
        return throwError(err);
      })
    );
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    return authService.genrateRefreshToken().pipe(
      switchMap((tokens: any) => {
        authService.saveRefreshedToken(tokens);
        return next.handle(this.AddTokenHeader(req, tokens.token));
      }),
      catchError((err) => {
        authService.logout();
        return throwError(err);
      })
    );
  }

  AddTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
