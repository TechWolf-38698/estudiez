import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-assign-id-course',
  templateUrl: './assign-id-course.component.html',
  styleUrls: ['./assign-id-course.component.css'],
})
export class AssignIdCourseComponent implements OnInit {
  studentId: any;
  selectedCourse: any = '';
  courses: any = [];
  students: any = [];
  filteredStudents: any = [];
  isLoading = false;
  studentCourses: any = [];
  filteredCourses: any = [];
  constructor(
    private AdminService: AdminService,
    private Route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = parseInt(this.Route.snapshot.paramMap.get('id') + '');
    this.getAllCourses();
  }

  // Filter Common courses from courses
  filterCourses(data: any) {
    //remove duplicate courses
    //remove courses that are already assigned to the student
    this.filteredCourses = this.courses.filter((course: any) => {
      return !data.some((studentCourse: any) => {
        return studentCourse.id === course.id;
      });
    });

    console.log(this.filteredCourses);
  }

  getAllCourses() {
    this.isLoading = true;
    this.AdminService.getAllCourses().subscribe(
      (data: any) => {
        this.isLoading = false;
        this.courses = data;
        this.getStudentCourses(
          parseInt(this.Route.snapshot.paramMap.get('id') + '')
        );
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
    // this.filterCourses();
  }

  getStudentCourses(id: number) {
    this.isLoading = true;
    let myId = parseInt(id + '');
    this.AdminService.GetCourcesByStudent(myId).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.studentCourses = data;
        // console.log(this.studentCourses);
        this.filterCourses(this.studentCourses);
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  assignStudent() {
    let payLoad = {
      courseId: parseInt(this.selectedCourse),
      studentId: this.studentId,
      status: 'assigned',
    };
    console.log(payLoad);
    this.AdminService.AssignStudentCourse(payLoad).subscribe((data: any) => {
      this.isLoading = false;
      this.getStudentCourses(this.studentId);
    });
    this.selectedCourse = ''; 
  }
}
