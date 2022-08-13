import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-students-manage',
  templateUrl: './students-manage.component.html',
  styleUrls: ['./students-manage.component.css'],
})
export class StudentsManageComponent implements OnInit {
  courses: any = [];
  batches: any = [];
  students: any = [];
  isLoading = true;

  selectedCourse: string = '';
  selectedBatch: string = '';
  filteredBatches: Array<any> = [];
  filteredStudents: Array<any> = [];

  constructor(private adminService: AdminService) {
    // Get All Students
    this.adminService.getAllStudents().subscribe(
      (data) => {
        this.isLoading = false;
        this.students = data;
        this.filteredStudents = this.students;
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      }
    );
    // Get All Courses
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.isLoading = false;
        this.courses = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
    // Get All Batches
    this.adminService.GetAllBatches().subscribe(
      (data) => {
        this.isLoading = false;
        this.batches = data;
        this.filteredBatches = this.batches;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onCourseChange() {
    if (this.selectedCourse !== '') {
      this.batchesByCourseId(this.selectedCourse);
    } else {
      this.filteredStudents = this.students;
      this.filteredBatches = this.batches;
      this.selectedBatch = '';
    }
  }
  onBatchChange() {
    if (this.selectedBatch !== '') {
      this.studentsByBatchId(this.selectedBatch);
    } else {
      this.filteredStudents = this.students;
    }
  }

  batchesByCourseId(courseId: string) {
    console.log(courseId);
    this.filteredBatches = this.batches.filter(
      (batch: any) => batch.courseId === parseInt(courseId)
    );
  }

  studentsByBatchId(batchId: string) {
    console.log(batchId);
    this.filteredStudents = this.students.filter(
      (student: any) => student.batchId === parseInt(batchId)
    );
  }

  ngOnInit(): void {}
}
