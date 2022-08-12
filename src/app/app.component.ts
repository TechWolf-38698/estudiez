import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'estudiez';
  isLoggedIn = false;

  constructor(private auth: AuthService) {
    if (this.auth.getToken()) {
      //console.log('token', this.auth.getToken());
      
      this.isLoggedIn = true;
    }
  }
}
