import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css'],
})
export class ManageCourseComponent implements OnInit {
  courses: any = [];
  isLoading = true;

  constructor(private adminService: AdminService) {
    this.adminService.getAllCourses().subscribe((data) => {
      this.isLoading = false;
      this.courses = data;
      console.log(this.courses);
    }),
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      };
  }

  onDelete(id: any) {
    this.isLoading = true;
    this.adminService.RemoveCourse(id).subscribe((data) => {
      this.isLoading = false;
      this.adminService.getAllCourses().subscribe((data) => {
        this.isLoading = false;
        this.courses = data;
        console.log(this.courses);
      }),
        (error: any) => {
          this.isLoading = false;
          console.log(error);
        };
    }),
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      };
  }

  ngOnInit(): void {}
}
