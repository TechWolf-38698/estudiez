import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tests-manage',
  templateUrl: './tests-manage.component.html',
  styleUrls: ['./tests-manage.component.css'],
})
export class TestsManageComponent implements OnInit {
  isLoading = false;

  constructor(private AdminService: AdminService) {}

  // On init we will get all the courses, batches and tests
  // then we will filter the tests based on the selected course and batch

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllBatches();
    this.getAllTests();
    this.getAllTeahers();
  }

  courses: Array<any> = [];
  batches: Array<any> = [];
  tests: Array<any> = [];
  teachers: Array<any> = [];

  selectedCourse: string = '';
  selectedBatch: string = '';
  filteredBatches: Array<any> = [];
  filteredTests: Array<any> = [];

  batchesByCourseId(courseId: string) {
    this.AdminService.GetBatchesByCourse(courseId).subscribe(
      (res: any) => {
        this.filteredBatches = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  testsByBatchId(batchId: string) {
    console.log(batchId);
    this.filteredTests = this.tests.filter(
      (test) => test.batchId === parseInt(batchId)
    );
  }

  onCourseChange() {
    if (this.selectedCourse !== '') {
      this.batchesByCourseId(this.selectedCourse);
    } else {
      this.filteredTests = [];
      this.filteredBatches = [];
      this.selectedBatch = '';
    }
  }

  onBatchChange() {
    if (this.selectedBatch !== '') {
      this.testsByBatchId(this.selectedBatch);
    } else {
      this.filteredTests = [];
    }
  }

  // getBatchId(batchId: number) {
  //   return this.batches.find((batch: any) => batch.id === batchId).id;
  // }
  getTeacherName(teacherId: number) {
    return this.teachers.find((teacher: any) => teacher.id === teacherId).name;
  }
  getBatchName(batchId: number) {
    return this.batches.find((batch: any) => batch.id === batchId).batchCode;
  }
  getTeacherByBatchId(batchId: number) {
    return this.batches.find((batch: any) => batch.id === batchId).teacherId;
  }

  getAllTests() {
    this.isLoading = true;
    this.AdminService.GetAllTests().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.tests = res;
        this.filteredTests = this.tests;
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  }
  getAllBatches() {
    this.AdminService.GetAllBatches().subscribe(
      (res: any) => {
        this.batches = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllCourses() {
    this.AdminService.getAllCourses().subscribe(
      (res: any) => {
        this.courses = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllTeahers() {
    this.AdminService.getAllTeachers().subscribe(
      (res: any) => {
        this.teachers = res;
        console.log(this.teachers);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
