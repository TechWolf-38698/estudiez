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
  private RemoveCourseURL = `${environment.BASE_URL}/Course/Remove?id=`;
  private GetAllBatchesURL = `${environment.BASE_URL}/Batch/GetAll`;
  private AddBatchURL = `${environment.BASE_URL}/Batch/Add`;
  private RemoveBatchURL = `${environment.BASE_URL}/Batch/Remove`;
  private GetAllTestsURL = `${environment.BASE_URL}/Test/GetAll`;
  private AddTestURL = `${environment.BASE_URL}/Test/Add`;
  private GetBatchesByCourseURL = `${environment.BASE_URL}/Batch/GetAllByCourse`;
  private GetBatchByIdURL = `${environment.BASE_URL}/Batch/GetById`;
  private GetCourcesByStudentURL = `${environment.BASE_URL}/Student/GetCourcesByStudent`;
  private AssignStudentCourseURL = `${environment.BASE_URL}/StudentCources/AssignCourse`;
  private GetAllExtraClassesURL = `${environment.BASE_URL}/ExtraClass/GetAll`;

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
    return this.http.delete(`${this.RemoveCourseURL}${parseInt(id)}`);
  }
  GetAllBatches() {
    return this.http.get(this.GetAllBatchesURL);
  }
  AddBatch(batch: any) {
    return this.http.post(this.AddBatchURL, batch);
  }
  GetBatchesByCourse(courseId: any) {
    return this.http.get(`${this.GetBatchesByCourseURL}?id=${courseId}`);
  }

  RemoveBatch(id: any) {
    return this.http.delete(`${this.RemoveBatchURL}?id=${parseInt(id)}`);
  }
  GetAllTests() {
    return this.http.get(this.GetAllTestsURL);
  }
  AddTest(test: any) {
    return this.http.post(this.AddTestURL, test);
  }
  GetBatchById(id: any) {
    return this.http.get(`${this.GetBatchByIdURL}?id=${id}`);
  }
  GetCourcesByStudent(id: any) {
    return this.http.get(`${this.GetCourcesByStudentURL}?id=${id}`);
  }
  AssignStudentCourse(studentCource: any) {
    return this.http.post(this.AssignStudentCourseURL, studentCource);
  }
  GetAllExtraClasses() {
    return this.http.get(this.GetAllExtraClassesURL);
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
