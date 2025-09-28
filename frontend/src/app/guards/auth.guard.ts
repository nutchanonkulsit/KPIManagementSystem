import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let token: string | null = null;
    let role: string | null = null;

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
      role = localStorage.getItem('role');
    }

    if (token) {
      // ✅ Already logged in → redirect by role
      if (role === 'admin') {
        this.router.navigate(['/admin/manage-kpi']);
      } else if (role === 'user') {
        this.router.navigate(['/user/kpi']);
      } else {
        this.router.navigate(['/unauthorized']);
      }
      return false; 
    }

    return true;
  }
}
