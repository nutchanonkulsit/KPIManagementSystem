import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

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

  // Search
  searchQuery = '';

  // Notifications
  notificationCount = 0;
  notifications: Notification[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.pageTitle = 'KPI Dashboard';
      this.pageDescription = 'Track and manage your key performance indicators';
    } else if (url.includes('/kpis/create')) {
      this.pageTitle = 'Create New KPI';
      this.pageDescription = 'Define a new key performance indicator';
    }
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
