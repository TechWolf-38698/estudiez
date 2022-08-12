import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate() {
    if (this.auth.haveRole() === "Admin") {
      return true;
    } else {
      this.auth.logout();
      return false;
    }
  }
}