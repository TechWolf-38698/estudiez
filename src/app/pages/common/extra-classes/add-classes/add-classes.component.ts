import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css'],
})
export class AddClassesComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.ngOnInit();
  }

  loading = false;

  form = this.fb.group({
    course: ['', Validators.required],
    batch: ['', Validators.required],
    subject: ['', Validators.required],
    teacher: ['', Validators.required],
    date: ['', Validators.required],
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
  get teacher() {
    return this.form.get('teacher');
  }
  get date() {
    return this.form.get('date');
  }
}
