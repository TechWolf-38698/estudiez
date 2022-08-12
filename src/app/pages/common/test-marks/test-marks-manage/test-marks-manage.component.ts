import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test-marks-manage',
  templateUrl: './test-marks-manage.component.html',
  styleUrls: ['./test-marks-manage.component.css'],
})
export class TestMarksManageComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

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
    } else {
      this.filteredBatches = [];
      this.selectedBatch = '';
    }
  }
  onBatchChange() {
    if (this.selectedBatch !== '') {
      this.testsByBatchId(this.selectedBatch);
    }
  }
  onTestChange() {
    if (this.selectedTest !== '') {
    }
  }

  getCourseName(courseId: number) {
    return this.courses.find((course: any) => course.id === courseId).name;
  }
  getBatchId(batchId: number) {
    return this.batches.find((batch: any) => batch.id === batchId).id;
  }
  getTeacherName(teacherId: number) {
    return this.teachers.find((teacher: any) => teacher.id === teacherId).name;
  }

  getAllTests() {
    this.tests = [
      {
        id: 1,
        title: 'Test 1',
        subject: 'English',
        teacherId: 2,
        totalMarks: 50,
        passingMarks: 25,
        date: '2020-01-01',
        time: '10:00',
        courseId: 1,
        batchId: 1,
      },
      {
        id: 2,
        title: 'Test 2',
        subject: 'Urdu',
        totalMarks: 100,
        passingMarks: 50,
        teacherId: 3,
        date: '2020-01-01',
        time: '10:00',
        courseId: 2,
        batchId: 3,
      },
      {
        id: 3,
        title: 'Test 3',
        subject: 'Physics',
        totalMarks: 100,
        passingMarks: 50,
        teacherId: 2,
        date: '2020-01-01',
        time: '10:00',
        courseId: 1,
        batchId: 2,
      },
      {
        id: 4,
        title: 'Test 4',
        subject: 'Chemistry',
        totalMarks: 100,
        passingMarks: 50,
        teacherId: 4,
        date: '2020-01-01',
        time: '10:00',
        courseId: 2,
        batchId: 4,
      },
    ];
  }
  getAllBatches() {
    this.batches = [
      {
        id: 1,
        courseId: 1,
        batchId: 'Batch 1',
      },
      {
        id: 2,
        courseId: 1,
        batchId: 'Batch 2',
      },
      {
        id: 3,
        courseId: 2,
        batchId: 'Batch 3',
      },
      {
        id: 4,
        courseId: 2,
        batchId: 'Batch 4',
      },
    ];
    // this.filteredBatches = this.batches;
  }
  getAllCourses() {
    this.courses = [
      {
        id: 1,
        name: 'Course 1',
      },
      {
        id: 2,
        name: 'Course 2',
      },
      {
        id: 3,
        name: 'Course 3',
      },
      {
        id: 4,
        name: 'Course 4',
      },
      {
        id: 5,
        name: 'Course 5',
      },
    ];
  }
  getAllTeahers() {
    this.teachers = [
      {
        id: 1,
        name: 'Teacher 1',
      },
      {
        id: 2,
        name: 'Teacher 2',
      },
      {
        id: 3,
        name: 'Teacher 3',
      },
      {
        id: 4,
        name: 'Teacher 4',
      },
      {
        id: 5,
        name: 'Teacher 5',
      },
    ];
  }

  formGen = 0;

  searchStudents() {
    (this.testMarksForm.controls.testMarks as FormArray).clear();
    // console.log(this.selectedBatch);

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
