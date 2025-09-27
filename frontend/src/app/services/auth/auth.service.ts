import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  login(email: String, password: String) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
  }
}
