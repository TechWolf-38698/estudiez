import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-students-add',
  templateUrl: './students-add.component.html',
  styleUrls: ['./students-add.component.css'],
})
export class StudentsAddComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.ngOnInit();
  }

  loading = false;

  form = this.fb.group({
    course: ['', Validators.required],
    batch: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    age: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    window.setTimeout(() => {
      console.log(this.form.value);
      this.form.reset();
      this.loading = false;
      this.ngOnInit();
    }, 1000);
  }

  get course() {
    return this.form.get('course');
  }
  get batch() {
    return this.form.get('batch');
  }
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get address() {
    return this.form.get('address');
  }
  get age() {
    return this.form.get('age');
  }
}
