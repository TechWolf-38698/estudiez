import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.ngOnInit();
  }

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.adminService.AddCourse(this.form.value).subscribe(
      (res) => {
        this.loading = false;
        this.form.reset();
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
    // window.setTimeout(() => {
    //   console.log(this.form.value);
    //   this.form.reset();
    //   this.loading = false;
    // }, 1000);
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
}
