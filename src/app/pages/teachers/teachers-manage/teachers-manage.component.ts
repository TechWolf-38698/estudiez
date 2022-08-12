import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-teachers-manage',
  templateUrl: './teachers-manage.component.html',
  styleUrls: ['./teachers-manage.component.css'],
})
export class TeachersManageComponent implements OnInit {
  teachers: any = [];
  isLoading = true;

  constructor(private adminService: AdminService) {
    this.adminService.getAllTeachers().subscribe((data) => {
      this.isLoading = false;
      this.teachers = data;
      console.log(this.teachers);
      
    }),
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      };
  }

  ngOnInit(): void {}

}
