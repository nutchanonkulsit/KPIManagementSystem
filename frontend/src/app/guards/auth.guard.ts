import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    let token: string | null = null;
    let role: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem('token');
      role = localStorage.getItem('role');
    }

    // If already logged in → redirect to role-based default page
    if (token && role) {
      if (role === 'admin') return this.router.parseUrl('/admin/dashboard');
      if (role === 'user') return this.router.parseUrl('/user/kpi');
    }

    return true; // allow access to /login
  }
}
