import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let role: string | null = null;

    if (typeof localStorage !== 'undefined') {
      role = localStorage.getItem('role');
    }

    const expectedRole = route.data['role']; // from route config

    if (role && role === expectedRole) {
      return true;
    }

    // 🚫 if role is missing or doesn’t match → redirect to their "initial route"
    if (role === 'admin') {
      return this.router.parseUrl('/admin/manage-kpi');
    } else if (role === 'user') {
      return this.router.parseUrl('/user/kpi');
    } else {
      localStorage.clear();
      return this.router.parseUrl('/');
    }
  }
}
