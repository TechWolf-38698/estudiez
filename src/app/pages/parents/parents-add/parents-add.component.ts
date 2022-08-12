import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parents-add',
  templateUrl: './parents-add.component.html',
  styleUrls: ['./parents-add.component.css']
})
export class ParentsAddComponent implements OnInit {

  constructor(private fb: FormBuilder) {
    this.ngOnInit();
  }

  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
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

  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get address() {
    return this.form.get('address');
  }
}