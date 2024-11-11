import { Routes } from '@angular/router';
import { MyTaskComponent } from './pages/my-task/my-task.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: MyTaskComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];