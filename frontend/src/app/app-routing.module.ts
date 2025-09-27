import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { KpiComponent } from './pages/user/kpi/kpi.component';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user',
    component: LayoutComponent,
    children: [{ path: 'kpi', component: KpiComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
