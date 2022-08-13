import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.css'],
})
export class BatchAddComponent implements OnInit {
  courses: any = [];
  teachers: any = [];
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(this.courses);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.adminService.getAllTeachers().subscribe(
      (data) => {
        this.teachers = data;
        console.log(this.teachers);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loading = false;

  form = this.fb.group({
    batchCode: ['', Validators.required],
    courseId: [null, Validators.required],
    teacherId: [null, Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    const customPayload = {
      batchCode: this.batchCode?.value,
      courseId: parseInt(this.form.value.courseId + ''),
      teacherId: parseInt(this.form.value.teacherId + ''),
    };
    console.log(customPayload);

    this.adminService.AddBatch(customPayload).subscribe(
      (data) => {
        this.loading = false;
        this.form.reset();
      },
      (error: any) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  get batchCode() {
    return this.form.get('batchCode');
  }
  get courseId() {
    return this.form.get('courseId');
  }
  get teacherId() {
    return this.form.get('teacherId');
  }
}
