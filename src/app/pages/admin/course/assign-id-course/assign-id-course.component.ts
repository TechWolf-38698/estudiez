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
    this.getAllCourses();
    this.getStudentCourses(
      parseInt(this.Route.snapshot.paramMap.get('id') + '')
    );
    this.studentId = parseInt(this.Route.snapshot.paramMap.get('id') + '');
  }

  // Filter Common courses from courses
  filterCourses() {
    // this.courses
    // this.studentCourses

    //find comon courses from two arrays
    //merge two arrays
    //remove duplicate courses
    //this.filteredCourses = this.courses.filter(course => { 
    let test = this.courses.concat(this.studentCourses).filter((item:any,index:any,self:any)=>{
        return self.findIndex((t:any)=>{
          return t.id === item.id;
        }) === index
      });

      console.log(test);
      
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
    // this.filterCourses();
  }
  getStudentCourses(id: number) {
    this.isLoading = true;
    let myId = parseInt(id + '');
    this.AdminService.GetCourcesByStudent(myId).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.studentCourses = data;
        console.log(this.studentCourses);
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
    this.filterCourses();
  }
  assignStudent(id: number) {
    console.log('course', id, 'student', this.studentId);
    let payLoad = {
      courseId: id,
      studentId: this.studentId,
      status: 'assigned',
    };
    this.AdminService.AssignStudentCourse(payLoad).subscribe((data: any) => {
      this.isLoading = false;
      this.getStudentCourses(this.studentId);
    });
  }
}
