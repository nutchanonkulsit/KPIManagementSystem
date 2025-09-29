import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ManageUserComponent } from './pages/admin/manage-user/manage-user.component';
import { KpiComponent } from './pages/user/kpi/kpi.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ManageKpiComponent } from './pages/admin/manage-kpi/manage-kpi.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DialogCreateKpiComponent } from './components/dialog-create-kpi/dialog-create-kpi.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageKpiCardComponent } from './components/manage-kpi-card/manage-kpi-card.component';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { DialogKpiUpdateComponent } from './components/dialog-kpi-update/dialog-kpi-update.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManageUserComponent,
    KpiComponent,
    LayoutComponent,
    LoginFormComponent,
    ManageKpiComponent,
    UnauthorizedComponent,
    KpiCardComponent,
    DashboardComponent,
    DialogCreateKpiComponent,
    ManageKpiCardComponent,
    DialogUserComponent,
    DashboardComponent,
    DialogKpiUpdateComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    NgChartsModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
