import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ContactUsComponent } from './pages/common/contact-us/contact-us.component';
import { FeedbackComponent } from './pages/common/feedback/feedback.component';
import { ParentsAddComponent } from './pages/parents/parents-add/parents-add.component';
import { ParentsIndexComponent } from './pages/parents/parents-index/parents-index.component';
import { ParentsManageComponent } from './pages/parents/parents-manage/parents-manage.component';
import { StudentsIndexComponent } from './pages/admin/students/students-index/students-index.component';
import { StudentsManageComponent } from './pages/admin/students/students-manage/students-manage.component';
import { StudentsAddComponent } from './pages/admin/students/students-add/students-add.component';
import { TeacherIndexComponent } from './pages/teachers/teacher-index/teacher-index.component';
import { TeachersAddComponent } from './pages/teachers/teachers-add/teachers-add.component';
import { TeachersManageComponent } from './pages/teachers/teachers-manage/teachers-manage.component';
import { IndexExtraClassesComponent } from './pages/common/extra-classes/index-extra-classes/index-extra-classes.component';
import { ManageClassesComponent } from './pages/common/extra-classes/manage-classes/manage-classes.component';
import { AddClassesComponent } from './pages/common/extra-classes/add-classes/add-classes.component';
import { TestsIndexComponent } from './pages/common/tests/tests-index/tests-index.component';
import { TestsManageComponent } from './pages/common/tests/tests-manage/tests-manage.component';
import { TestsAddComponent } from './pages/common/tests/tests-add/tests-add.component';
import { TestMarksIndexComponent } from './pages/common/test-marks/test-marks-index/test-marks-index.component';
import { TestMarksManageComponent } from './pages/common/test-marks/test-marks-manage/test-marks-manage.component';
import { TestMarksAddComponent } from './pages/common/test-marks/test-marks-add/test-marks-add.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { IndexCourseComponent } from './pages/admin/course/index-course/index-course.component';
import { ManageCourseComponent } from './pages/admin/course/manage-course/manage-course.component';
import { AddCourseComponent } from './pages/admin/course/add-course/add-course.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: AdminHomeComponent },
//   { path: 'feedback', component: FeedbackComponent },
//   { path: 'contactus', component: ContactUsComponent },
//   // Students
//   {
//     path: 'students',
//     component: StudentsIndexComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path: 'manage', component: StudentsManageComponent },
//       { path: 'add', component: StudentsAddComponent },
//     ],
//   },
//   // Teachers
//   {
//     path: 'teachers',
//     component: TeacherIndexComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path: 'manage', component: TeachersManageComponent },
//       { path: 'add', component: TeachersAddComponent },
//     ],
//   },
//   // Parents
//   {
//     path: 'parents',
//     component: ParentsIndexComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path: 'manage', component: ParentsManageComponent },
//       { path: 'add', component: ParentsAddComponent },
//     ],
//   },
//   // Tests
//   {
//     path: 'tests',
//     component: TestsIndexComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path
//         : 'manage', component: TestsManageComponent },
//       { path: 'add', component: TestsAddComponent },
//     ],
//   },
//   // Test Marks
//   {
//     path: 'testmarks',
//     component: TestMarksIndexComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path: 'manage', component: TestMarksManageComponent },
//       { path: 'add', component: TestMarksAddComponent },
//       { path: 'add/:id', component: TestMarksAddComponent },
//     ],
//   },
//   // Extra Classes
//   {
//     path: 'extra-classes',
//     component: IndexExtraClassesComponent,
//     children: [
//       { path: '', redirectTo: 'manage', pathMatch: 'full' },
//       { path: 'manage', component: ManageClassesComponent },
//       { path: 'add', component: AddClassesComponent },
//     ],
//   },
// ];

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: AdminHomeComponent,
      },
      // Teachers
      {
        path: 'teachers',
        component: TeacherIndexComponent,
        children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'manage', component: TeachersManageComponent },
        ],
      },
      // Students
      {
        path: 'students',
        component: StudentsIndexComponent,
        children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'manage', component: StudentsManageComponent },
        ],
      },
      // Courses
      {
        path: 'courses',
        component: IndexCourseComponent,
        children: [
          { path: '', redirectTo: 'manage', pathMatch: 'full' },
          { path: 'manage', component: ManageCourseComponent },
          { path: 'add', component: AddCourseComponent },
        ],
      },
    ],
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
