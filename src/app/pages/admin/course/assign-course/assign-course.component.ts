import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css'],
})
export class AssignCourseComponent implements OnInit {
  selectedCourse: any = '';
  courses: any = [];
  students: any = [];
  filteredStudents: any = [];
  isLoading = false;
  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllStudents();
  }

  onCourseChange() {
    // this.selectedCourse = course;
  }

  getAllCourses() {
    this.isLoading = true;
    this.AdminService.getAllCourses().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.courses = data;
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  getAllStudents() {
    this.isLoading = true;
    this.AdminService.getAllStudents().subscribe(
      (data: any) => {
        this.students = data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  assignStudent(id: number){
    console.log("stdId", id , "course", parseInt(this.selectedCourse));
    
  }

}
