import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-test-marks-manage',
  templateUrl: './test-marks-manage.component.html',
  styleUrls: ['./test-marks-manage.component.css'],
})
export class TestMarksManageComponent implements OnInit {
  constructor(private fb: FormBuilder, private AdminService: AdminService) {}

  // On init we will get all the courses, batches and tests
  // then we will filter the tests based on the selected course and batch

  courses: Array<any> = [];
  batches: Array<any> = [];
  tests: Array<any> = [];
  teachers: Array<any> = [];

  students: Array<any> = [];

  selectedCourse: string = '';
  selectedBatch: string = '';
  selectedTest: string = '';
  lastSelectedTest: any;
  finalSelectedTest: any;
  filteredBatches: Array<any> = [];
  filteredTests: Array<any> = [];

  testMarksForm = this.fb.group({
    testMarks: this.fb.array([]),
  });

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllBatches();
    this.getAllTests();
    this.getAllTeahers();
  }

  batchesByCourseId(courseId: string) {
    this.filteredBatches = this.batches.filter(
      (batch) => batch.courseId === parseInt(courseId)
    );
  }
  testsByBatchId(batchId: string) {
    this.filteredTests = this.tests.filter(
      (test) => test.batchId === parseInt(batchId)
    );
  }
  // testsByCourseId(courseId: string) {
  //   this.filteredTests = this.tests.filter(
  //     (test) => test.courseId === parseInt(courseId)
  //   );
  // }

  onCourseChange() {
    if (this.selectedCourse !== '') {
      this.batchesByCourseId(this.selectedCourse);
      this.selectedBatch = '';
      this.selectedTest = '';
      this.filteredTests = [];
    } else {
      this.filteredBatches = [];
      this.selectedBatch = '';
    }
    console.log(this.selectedCourse);
  }
  onBatchChange() {
    if (this.selectedBatch !== '') {
      this.testsByBatchId(this.selectedBatch);
      this.selectedTest = '';
    }
  }
  onTestChange() {
    if (this.selectedTest !== '') {
    }
  }

  getCourseName(courseId: string) {
    return this.courses.find((course: any) => course.id == parseInt(courseId))
      .name;
  }
  getBatchCode(batchId: number) {
    return this.batches.find((batch: any) => batch.id === batchId).batchCode;
  }
  getTeacherName(teacherId: number) {
    return this.teachers.find((teacher: any) => teacher.id === teacherId).name;
  }
  getTeacherByBatchId(batchId: number) {
    console.log(batchId);

    return this.batches.find((batch: any) => batch.id === batchId).teacherId;
  }

  getAllTests() {
    this.AdminService.GetAllTests().subscribe(
      (res: any) => {
        this.tests = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  getAllBatches() {
    this.AdminService.GetAllBatches().subscribe(
      (res: any) => {
        this.batches = res;
      },
      (err: any) => {}
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
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  // getCourseByBatchId(id: number) {
  //   console.log(id);
  //   console.log(this.courses);

  //   return this.courses.find((course: any) => course.id == id);
  // }

  formGen = 0;

  searchStudents() {
    (this.testMarksForm.controls.testMarks as FormArray).clear();
    // console.log(this.selectedBatch);

    console.log(this.filteredTests);

    this.students = [
      {
        id: 1,
        name: 'Student 1',
      },
      {
        id: 2,
        name: 'Student 2',
      },
      {
        id: 3,
        name: 'Student 3',
      },
      {
        id: 4,
        name: 'Student 4',
      },
      {
        id: 5,
        name: 'Student 5',
      },
    ];

    this.addControls(this.students.length, this.filteredTests[0].id);
    this.lastSelectedTest = this.selectedTest;

    //this.finalSelectedTest = this.filteredTests.filter((test) => test.id == this.lastSelectedTest);

    this.finalSelectedTest = this.filteredTests.filter(
      (test) => test.id == this.lastSelectedTest
    );
    this.formGen = 1;
  }

  addControls(e: number, testId: number) {
    for (let i = 0; i < e; i++) {
      const control = this.fb.group({
        studentId: [this.students[i].id, Validators.required],
        testId: [testId, Validators.required],
        marks: ['', Validators.required],
      });
      (this.testMarksForm.controls.testMarks as FormArray).push(control);
    }
  }
}
// make email message for signing up

// Hi, Thanks for signing up please wait for the admin to approve you.
