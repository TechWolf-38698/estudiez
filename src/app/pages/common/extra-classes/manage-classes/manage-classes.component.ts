import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css'],
})
export class ManageClassesComponent implements OnInit {
  extraClasses: any = [];
  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.getAllExtraClasses();
    console.log(this.extraClasses);
  }

  getAllExtraClasses() {
    this.AdminService.GetAllExtraClasses().subscribe(
      (res: any) => {
        this.extraClasses = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
