import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-tests-add',
  templateUrl: './tests-add.component.html',
  styleUrls: ['./tests-add.component.css'],
})
export class TestsAddComponent implements OnInit {
  courses: any = [];
  batches: any = [];
  selectedCourse: string = '';

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (err) => {
        console.log('err', err);
      }
    );
  }

  ABC() {
    console.log('working');
  }

  loading = false;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    course: [null, Validators.required],
    batchId: [null, Validators.required],
    subject: ['', Validators.required],
    totalMarks: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    examType: ['', Validators.required],
  });

  ngOnInit(): void {}

  onCourseChange() {
    const courseId = parseInt(this.course?.value + '');
    this.adminService.GetBatchesByCourse(courseId).subscribe(
      (data) => {
        this.batches = data;
      },
      (error) => {
        console.log('err', error);
      }
    );
  }

  onSubmit() {
    this.loading = true;

    const customPayload = {
      title: this.title?.value,
      description: this.description?.value,
      batchId: parseInt(this.batchId?.value + ' '),
      subject: this.subject?.value,
      date: this.date?.value,
      time: this.time?.value,
      totalMarks: this.totalMarks?.value?.toString(),
      examType: this.examType?.value,
    };
    console.log('customPayload', customPayload);

    this.adminService.AddTest(customPayload).subscribe(
      (data) => {
        console.log('res', data);
        this.form.reset();
        this.loading = false;
      },
      (error) => {
        console.log('err', error);
      }
    );

    // window.setTimeout(() => {
    //   console.log(this.form.value);

    //   this.ngOnInit();
    // }, 1000);
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get course() {
    return this.form.get('course');
  }
  get batchId() {
    return this.form.get('batchId');
  }
  get subject() {
    return this.form.get('subject');
  }
  get date() {
    return this.form.get('date');
  }
  get time() {
    return this.form.get('time');
  }
  get totalMarks() {
    return this.form.get('totalMarks');
  }
  get examType() {
    return this.form.get('examType');
  }
}
