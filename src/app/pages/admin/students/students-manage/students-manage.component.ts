import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-students-manage',
  templateUrl: './students-manage.component.html',
  styleUrls: ['./students-manage.component.css'],
})
export class StudentsManageComponent implements OnInit {
  students: any = [];
  isLoading = true;

  constructor(private adminService: AdminService) {
    this.adminService.getAllStudents().subscribe((data) => {
      this.isLoading = false;
      this.students = data;
      console.log(this.students);
    }),
      (error: any) => {
        this.isLoading = false;
        console.log(error);
      };
  }

  ngOnInit(): void {}
}
