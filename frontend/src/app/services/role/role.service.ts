import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Kpi } from '../../models/kpi';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private router: Router, private http: HttpClient) {}

  getAllRole()  {
    return this.http.get(`${environment.apiUrl}/roles`);
  }
}
