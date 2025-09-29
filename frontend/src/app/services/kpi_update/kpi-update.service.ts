import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Kpi } from '../../models/kpi';
import { Observable } from 'rxjs';
import { KpiUpdate } from '../../models/kpi-update';

@Injectable({
  providedIn: 'root',
})
export class KpiUpdateService {
  constructor(private router: Router, private http: HttpClient) {}

  createKPIUpdate(kpiUpdate: KpiUpdate) {
    return this.http.post(`${environment.apiUrl}/kpi_updates`, kpiUpdate);
  }

  getKPIUpdateByKPID(id: number) {
    let params = new HttpParams().set('kpi_id', id);
    return this.http.get(`${environment.apiUrl}/kpi_uodates`, { params });
  }
}
