import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-batch-manage',
  templateUrl: './batch-manage.component.html',
  styleUrls: ['./batch-manage.component.css'],
})
export class BatchManageComponent implements OnInit {
  teachers: any = [];
  courses: any = [];
  batches: any = [];
  isLoading = true;
  filteredBatches: any = [];
  selectedCourse: string = '';

  constructor(private adminService: AdminService) {
    this.adminService.GetAllBatches().subscribe(
      (data) => {
        this.isLoading = false;
        this.batches = data;
        this.filteredBatches = this.batches;
        console.log(this.filteredBatches);
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  // onDelete(id: any) {
  //   this.isLoading = true;
  //   this.adminService.RemoveCourse(id).subscribe((data) => {
  //     this.isLoading = false;
  //     this.adminService.getAllCourses().subscribe((data) => {
  //       this.isLoading = false;
  //       this.batches = data;
  //       console.log(this.batches);
  //     }),
  //       (error: any) => {
  //         this.isLoading = false;
  //         console.log(error);
  //       };
  //   }),
  //     (error: any) => {
  //       this.isLoading = false;
  //       console.log(error);
  //     };
  // }

  ngOnInit(): void {
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.isLoading = false;
        this.courses = data;
        // console.log(this.courses);
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    );
    this.getAllTeachers();
  }

  onCourseChange() {
    if (this.selectedCourse !== '') {
      this.filteredBatches = this.batches.filter(
        (batch: any) => batch.courseId === parseInt(this.selectedCourse)
      );
    } else {
      this.filteredBatches = this.batches;
    }
  }

  getCourseName(courseId: number) {
    return this.courses.find((course: any) => course.id === courseId).name;
  }

  onDelete(id: any) {
    this.isLoading = true;
    this.adminService.RemoveBatch(parseInt(id)).subscribe(
      (data) => {
        this.isLoading = false;
        this.adminService.GetAllBatches().subscribe(
          (data) => {
            this.isLoading = false;
            this.batches = data;
            console.log(this.batches);
          },
          (error: any) => {
            this.isLoading = false;
            console.log(error);
          }
        );
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  getTeacherName(teacherId: number) {
    return this.teachers.find((teacher: any) => teacher.id === teacherId).name;
  }

  getAllTeachers() {
    this.isLoading = true;
    this.adminService.getAllTeachers().subscribe(
      (data) => {
        this.isLoading = false;
        this.teachers = data;
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
