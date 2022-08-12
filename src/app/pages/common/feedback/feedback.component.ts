import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}

  feedbackForm = this.fb.group({
    message: ['', Validators.required],
  });

  
  Submit() {
    console.log(this.feedbackForm.value);
  }
}
