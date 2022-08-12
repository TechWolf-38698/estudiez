import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tests-add',
  templateUrl: './tests-add.component.html',
  styleUrls: ['./tests-add.component.css']
})
export class TestsAddComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.ngOnInit();
  }

  loading = false;

  form = this.fb.group({
    course: [null, Validators.required],
    batch: [null, Validators.required],
    subject: ['', Validators.required],
    totalMarks: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
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
}
