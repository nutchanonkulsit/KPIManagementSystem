import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { KpiUpdate } from '../../models/kpi-update';

@Injectable({
  providedIn: 'root',
})
export class KpiUpdateService {
  constructor(private http: HttpClient) {}

  createKPIUpdate(kpiUpdate: KpiUpdate): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kpi_updates`, kpiUpdate);
  }

  getKPIUpdateByKPID(id: number): Observable<any> {
    const params = new HttpParams().set('kpi_id', id);
    return this.http.get(`${environment.apiUrl}/kpi_updates`, { params });
  }
}
