import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Kpi } from '../../models/kpi';
import { forkJoin, map, Observable, tap } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class KpiService {
  constructor(private router: Router, private http: HttpClient) {}

  getAllKPI() {
    return this.http.get(`${environment.apiUrl}/kpis`);
  }

  getKPIByUserID(id: number) {
    const params = new HttpParams().set('user_id', id);
    return this.http.get(`${environment.apiUrl}/kpis/user`, { params });
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

  updateKPI(kpi: Kpi) {
    return this.http.put(`${environment.apiUrl}/kpis/${kpi.id}`, kpi);
  }

  deleteKPI(id: number) {
    return this.http.delete(`${environment.apiUrl}/kpis/${id}`);
  }
  getLast6MonthsProgress(): Observable<
    {
      month: string;
      progress: number;
      actual_value: number;
      target_value: number;
    }[]
  > {
    const requests: Observable<any>[] = [];
    const labels: string[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = moment().subtract(i, 'months');
      const monthNum = date.month() + 1; // Month 1-12
      labels.push(date.format('MMM YYYY'));

      const params = new HttpParams()
        .set('month', monthNum.toString())
        .set('year', date.year().toString());

      requests.push(
        this.http.get(`${environment.apiUrl}/kpis/progress`, { params })
      );
    }

    return forkJoin(requests).pipe(
      map((responses: any[]) =>
        responses.map((res, index) => ({
          month: labels[index],
          progress: Number(res.progressPercent) || 0,
          actual_value: res.totalActual || 0,
          target_value: res.totalTarget || 0,
        }))
      )
    );
  }
}
