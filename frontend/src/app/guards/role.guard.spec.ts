import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy for the Router
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(RoleGuard);

    // Default router.parseUrl mock to return string URL for test
    routerSpy.parseUrl.and.callFake((url: string) => url as unknown as UrlTree);
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if role matches expectedRole', () => {
    localStorage.setItem('role', 'admin');

    const route: any = { data: { role: 'admin' } };
    const result = guard.canActivate(route);

    expect(result).toBeTrue();
  });

  it('should redirect to initial route if role is admin but route expects user', () => {
    localStorage.setItem('role', 'admin');

    const route: any = { data: { role: 'user' } };
    const result = guard.canActivate(route);

    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/admin/manage-kpi');
    expect(result).toBe('/admin/manage-kpi' as unknown as UrlTree);
  });

  it('should redirect to initial route if role is user but route expects admin', () => {
    localStorage.setItem('role', 'user');

    const route: any = { data: { role: 'admin' } };
    const result = guard.canActivate(route);

    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/user/kpi');
    expect(result).toBe('/user/kpi' as unknown as UrlTree);
  });

  it('should redirect to unauthorized if role is missing', () => {
    const route: any = { data: { role: 'admin' } };
    const result = guard.canActivate(route);

    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/unauthorized');
    expect(result).toBe('/unauthorized' as unknown as UrlTree);
  });
});
