import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  @ViewChild('header') headerRef!: ElementRef;
  headerHeight: number = 0;

  private destroy$ = new Subject<void>();

  // User Management
  hasManagementAccess = false;

  // UI State
  mobileMenuOpen = false;
  userMenuOpen = false;
  showNotifications = false;
  isLoading = false;
  showQuickStats = true;

  // Navigation
  pageTitle = 'KPI Dashboard';
  pageDescription = 'Track and manage your key performance indicators';
  role: any;
  // Search
  searchQuery = '';

  // Notifications
  notificationCount = 0;
  notifications: Notification[] = [];

  private routerSubscription!: Subscription;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeComponent();
    this.getUserRole();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setPageTitleFromRoute();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Host Listener for responsive behavior
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth >= 1024) {
      this.mobileMenuOpen = false;
    }
  }

  private initializeComponent(): void {
    // Initialize component state
    this.setPageTitleFromRoute();
  }

  private setPageTitleFromRoute(): void {
    // Set page title based on current route
    const url = this.router.url;

    if (url.includes('/user/kpi')) {
      this.pageTitle = 'Performance Dashboard';
      this.pageDescription = 'Track and manage your key performance indicators';
    } else if (url.includes('/kpis/create')) {
      this.pageTitle = 'Create New KPI';
      this.pageDescription = 'Define a new key performance indicator';
    } else if (url.includes('admin/manage-kpi')) {
      this.pageTitle = 'KPI Management';
      this.pageDescription =
        'Create, read, update, and delete Key Performance Indicators';
    } else if (url.includes('admin/manage-user')) {
      this.pageTitle = 'Manage User';
      this.pageDescription = '';
    }
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role');
    }
    // if (typeof localStorage !== 'undefined') {
    //   return localStorage.getItem('role');
    // }
    return null;
  }

  logout(): void {
    this.isLoading = true;

    // Simulate logout process
    setTimeout(() => {
      this.isLoading = false;

      localStorage.clear();

      this.router.navigate(['/']);
    }, 1000);
  }
}
