import { Routes } from '@angular/router';
import { ExamListComponent } from './exams/components/exam-list/exam-list.component';
import { AddExamComponent } from './exams/components/add-exam/add-exam.component';

export const routes: Routes = [
  { path: '', redirectTo: '/exams', pathMatch: 'full' },
  { path: 'exams', component: ExamListComponent },
  { path: 'exams/add', component: AddExamComponent },
];
