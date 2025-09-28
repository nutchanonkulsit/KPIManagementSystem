import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Kpi } from '../../models/kpi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(private router: Router, private http: HttpClient) {}

  getAllKPI() {
    return this.http.get(`${environment.apiUrl}/kpis`);
  }

  getKPICount() {
    return this.http.get(`${environment.apiUrl}/kpis/count`);
  }

  getKPICountByStatus(statuses: string[]) {
    let params = new HttpParams();
    statuses.forEach((s) => {
      params = params.append('status', s);
    });

    return this.http.get(`${environment.apiUrl}/kpis/count/status`, { params });
  }

  createKPI(kpi: Kpi): Observable<Kpi> {
    return this.http.post<Kpi>(`${environment.apiUrl}/kpis`, kpi);
  }
}
