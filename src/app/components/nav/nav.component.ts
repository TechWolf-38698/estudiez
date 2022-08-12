import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private auth: AuthService, private test: AppComponent) {}
  ngOnInit(): void {    
  }

  navCheck = 0;

  showHide() {
    if (this.navCheck == 0) {
      document.getElementById('mainMenu')?.classList.add('d-block');
      document.getElementById('mainMenu')?.classList.remove('d-none');
      this.navCheck = 1;
    } else {
      document.getElementById('mainMenu')?.classList.add('d-none');
      document.getElementById('mainMenu')?.classList.remove('d-block');
      this.navCheck = 0;
    }
  }

  role = this.auth.haveRole().toLowerCase();

  logout() {
    this.auth.logout();
    this.test.isLoggedIn = false;
  }

  // @Input() role: string = '';
}
