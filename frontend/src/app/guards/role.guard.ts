import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let role: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      role = localStorage.getItem('role');
    }

    const expectedRole = route.data['role'];

    // If route has expectedRole and matches user → allow
    if (expectedRole && role === expectedRole) {
      return true;
    }

    
    // Redirect based on actual role
    if (role === 'admin') {
      return this.router.parseUrl('/admin/dashboard');
    } else if (role === 'user') {
      return this.router.parseUrl('/user/kpi');
    } else {
      return true;
    }
  }
}
