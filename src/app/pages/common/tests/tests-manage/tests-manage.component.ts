import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests-manage',
  templateUrl: './tests-manage.component.html',
  styleUrls: ['./tests-manage.component.css'],
})
export class TestsManageComponent implements OnInit {
  constructor() {}

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
    console.log(courseId);
    this.filteredBatches = this.batches.filter(
      (batch) => batch.courseId === parseInt(courseId)
    );
  }
  testsByBatchId(batchId: string) {
    console.log(batchId);
    this.filteredTests = this.tests.filter(
      (test) => test.batchId === parseInt(batchId)
    );
  }
  testsByCourseId(courseId: string) {
    this.filteredTests = this.tests.filter(
      (test) => test.courseId === parseInt(courseId)
    );
  }

  onCourseChange() {
    if (this.selectedCourse !== '') {
      this.batchesByCourseId(this.selectedCourse);
      this.testsByCourseId(this.selectedCourse);
    } else {
      this.filteredTests = this.tests;
      this.filteredBatches = [];
      this.selectedBatch = '';
    }
  }

  onBatchChange() {
    if (this.selectedBatch !== '') {
      this.testsByBatchId(this.selectedBatch);
    } else {
      this.testsByCourseId(this.selectedCourse);
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
        testName: 'Test 1',
        subject: 'English',
        teacherId: 1,
        totalMarks: 100,
        passingMarks: 50,
        date: '2020-01-01',
        time: '10:00',
        courseId: 1,
        batchId: 1,
      },
      {
        id: 2,
        testName: 'Test 2',
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
        testName: 'Test 3',
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
        testName: 'Test 4',
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
    this.filteredTests = this.tests;
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
}
