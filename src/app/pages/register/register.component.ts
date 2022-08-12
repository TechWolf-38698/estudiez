import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerpayload = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private routes: Router) {}

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.routes.navigate(['/admin']);
    }
  }

  error = '';

  register(): void {
    // console.log(this.registerpayload);
    this.auth.register(this.registerpayload).subscribe(
      (data: any) => {
        this.auth.setToken(data.token);
        this.auth.setRefreshToken(data.refreshToken);
        this.routes.navigate(['/admin']);
      },
      (err) => {
        this.error = err.error;
      }
    );
  }
}