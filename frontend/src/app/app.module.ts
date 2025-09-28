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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
