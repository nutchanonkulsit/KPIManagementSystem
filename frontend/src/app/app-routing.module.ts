import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { KpiComponent } from './pages/user/kpi/kpi.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ManageKpiComponent } from './pages/admin/manage-kpi/manage-kpi.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: { role: 'user' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'kpi', component: KpiComponent },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-kpi', component: ManageKpiComponent },
      {
        path: 'manage-user',
        component: ManageUserComponent,
      },
    ],
  },
  // {
  //   path: 'unauthorized',
  //   component: UnauthorizedComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
