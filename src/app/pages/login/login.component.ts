import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginPayload = {
    username: '',
    password: '',
  };

  error = '';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.router.navigate(['/admin']);
    }
  }

  login(): void {
  //  console.log(this.loginPayload);
    this.auth.login(this.loginPayload).subscribe(
      (data: any) => {
        this.auth.setToken(data.token);
        this.auth.setRefreshToken(data.refreshToken);
        //console.log(this.auth.haveRole());
        if(this.auth.haveRole() === "Admin"){
          this.router.navigate(['/admin']);
          window.location.reload();
        }
      },
      (err) => {
        this.error = err.error;
      }
    );
  }

  

  admin = false;
  teacher = false;
  student = false;
  parent = false;

  _ADMIN(): void {
    this.admin = !this.admin;
    this.teacher = false;
    this.student = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }

  _TEACHER(): void {
    this.teacher = !this.teacher;
    this.admin = false;
    this.student = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
  _STUDENT(): void {
    this.student = !this.student;
    this.admin = false;
    this.teacher = false;
    this.parent = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
  _PARENT(): void {
    this.parent = !this.parent;
    this.admin = false;
    this.teacher = false;
    this.student = false;
    this.loginPayload.username = '';
    this.loginPayload.password = '';
    this.error = '';
  }
}