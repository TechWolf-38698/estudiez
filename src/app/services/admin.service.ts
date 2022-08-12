import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // public ApproveTeacher = `${environment.BASE_URL}/User/Approve`;
  // public registerTeacherURL = `${environment.BASE_URL}/User/register`;
  private getAllTeachersURL = `${environment.BASE_URL}/Teacher/GetAll`;
  private getAllStudentsURL = `${environment.BASE_URL}/Student/GetAll`;
  private getAllCoursesURL = `${environment.BASE_URL}/Course/GetAll`;
  private AddCourseURL = `${environment.BASE_URL}/Course/Add`;
  private RemoveCourseURL = `${environment.BASE_URL}/Course/Remove`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtdecode: JwtHelperService,
    private MyAppRoutingModule: AppRoutingModule
  ) {}

  getAllTeachers() {
    return this.http.get(this.getAllTeachersURL);
  }

  getAllStudents() {
    return this.http.get(this.getAllStudentsURL);
  }
  getAllCourses() {
    return this.http.get(this.getAllCoursesURL);
  }

  AddCourse(course: any) {
    return this.http.post(this.AddCourseURL, course);
  }
  RemoveCourse(id: any) {
    return this.http.delete(`${this.RemoveCourseURL}/${parseInt(id)}`);
  }

  // addTeacher(teacher: any) {
  //   return this.http.post(this.addTeachersURL, teacher);
  // }

  // registerTeacher(teacher: any) {
  //   return this.http.post(this.registerTeacherURL, teacher);
  // }

  // ApproveTeacherApi(id: any) {
  //   return this.http.put(`${this.ApproveTeacher}?userid=${parseInt(id)}`, {});
  // }
}
