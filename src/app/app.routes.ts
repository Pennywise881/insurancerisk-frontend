import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Applications } from './pages/applications/applications';
import { Assessments } from './pages/assessments/assessments';
import { Settings } from './pages/settings/settings';
import { CreateApplication } from './pages/create-application/create-application';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'applications', pathMatch: 'full' },
      { path: 'applications', component: Applications },
      { path: 'assessments', component: Assessments },
      { path: 'settings', component: Settings },
      { path: 'create-application', component: CreateApplication },
    ]
  }
];