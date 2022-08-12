import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachers-add',
  templateUrl: './teachers-add.component.html',
  styleUrls: ['./teachers-add.component.css'],
})
export class TeachersAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private http: HttpClient
  ) {
    this.ngOnInit();
  }

  loading = false;
  errors = '';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
  });

  id = '';

  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;

    const custompayload = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.email,
      username: this.form.value.email,
    };

    

    //     this.addTeacher(custompayload).then(data=>{

    //     });
    //     this.adminService.registerTeacher(custompayload).subscribe(
    //       (data: any) => {
    //         //register api call
    //         console.log(data);

    //         this.id = data.id;
    //       },
    //       (error: any) => {
    //         this.loading = false;
    //         this.errors = error.error.message;
    //         //alert("error");
    //         const payload = {
    //           name: this.form.value.name,
    //           email: this.form.value.email,
    //           address: this.form.value.address,
    //           userId: parseInt(this.id),
    //         };

    //         this.adminService.addTeacher(payload).subscribe(
    //           (data: any) => {

    //           console.log(data);
    //             //add teacher api call
    //             this.loading = false;
    //             this.form.reset();
    //             this.loading = false;
    //             this.ngOnInit();
    // return data;
    //             // this.http
    //             //   .get(this.adminService.ApproveTeacher + '?userid=' + this.id)
    //             //   .subscribe((data: any) => {
    //             //     //approve teacher api call
    //             //     alert('Teacher added successfully');
    //             //   });
    //           },

    //           (error: any) => {
    //             this.loading = false;
    //             this.errors = error.error.message;
    //           }
    //         );
    //       }
    //     ); //Teacher add api call
  }

  // addTeacher(payload:any){
  //   let promise = new Promise((resolve, reject) => {
  //    this.http.post(this.adminService.registerTeacherURL,payload).toPromise().then(res=>{
  //     console.log(res);
  //     resolve(res);
  //    });
  //   });
  //   return promise;
  // }

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
