import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should block login if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // depends on your guard
  });
});
