import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = `${environment.BASE_URL}/User/login`;
  private refreshTokenURL = `${environment.BASE_URL}/User/refresh-token`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtdecode: JwtHelperService,
    private MyAppRoutingModule: AppRoutingModule
  ) {}

  login(loginPayload: any) {
    return this.http.post(this.loginURL, loginPayload);
  }

  register(registerPayload: any) {
    return this.http.post(
      `${environment.BASE_URL}/User/register`,
      registerPayload
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  haveRole() {
    let token = this.getToken() || '';
    let decoded = this.jwtdecode.decodeToken(token);
    var role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    return role;
  }



  genrateRefreshToken() {
    return this.http.post(this.refreshTokenURL, {
      accessToken: this.getToken(),
      refreshToken: this.getRefreshToken(),
    });
  }

  saveRefreshedToken(tokens: any) {
    this.setToken(tokens.token);
    this.setRefreshToken(tokens.refreshToken);
  }

  isTokenExist(){
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }
}