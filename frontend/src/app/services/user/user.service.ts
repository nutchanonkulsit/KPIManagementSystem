import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private http: HttpClient) {}

  getAllUser() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }
}
