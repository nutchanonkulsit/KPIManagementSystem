import { Component, OnInit } from '@angular/core';
import { KpiService } from '../../services/kpi/kpi.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalKPI: number = 0;
  onTrackKPI: number = 0;
  atRiskKPI: number = 0;
  offTrackKPI: number = 0;

  onTrackPercent: number = 0;
  atRiskPercent: number = 0;
  offTrackPercent: number = 0;

  kpiMonthly: any = [];

  selectedUser: number | null = null; // default null
  selectedStatus: string | null = null; // default null

  users: any[] = [];
  statuses: string[] = ['On Track', 'At Risk', 'Off Track'];

  constructor(
    private kpiService: KpiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.countKPI();
  }

  // Load all users
  getAllUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res || [];
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  // Count KPIs and load chart
  countKPI(): void {
    this.getKPICount();
    this.getKPICountByStatus('On Track');
    this.getKPICountByStatus('At Risk');
    this.getKPICountByStatus('Off Track');
    this.getLast6MonthsProgress();
  }

  getKPICount(): void {
    this.kpiService.getKPICount().subscribe({
      next: (res: any) => {
        this.totalKPI = res.totalKPI;
        this.calculatePercentages();
      },
      error: (err) => console.error('Failed to load total KPI', err),
    });
  }

  getKPICountByStatus(status: string): void {
    this.kpiService.getKPICountByStatus([status]).subscribe({
      next: (res: any) => {
        if (status === 'On Track') this.onTrackKPI = res.count;
        else if (status === 'At Risk') this.atRiskKPI = res.count;
        else if (status === 'Off Track') this.offTrackKPI = res.count;

        this.calculatePercentages();
      },
      error: (err) => console.error(`Failed to load KPI count for ${status}`, err),
    });
  }

  calculatePercentages(): void {
    if (this.totalKPI > 0) {
      this.onTrackPercent = Math.round((this.onTrackKPI / this.totalKPI) * 100);
      this.atRiskPercent = Math.round((this.atRiskKPI / this.totalKPI) * 100);
      this.offTrackPercent = Math.round((this.offTrackKPI / this.totalKPI) * 100);
    } else {
      this.onTrackPercent = this.atRiskPercent = this.offTrackPercent = 0;
    }
  }

  // Filter change handler
  onFilterChange(): void {
    this.getLast6MonthsProgress(this.selectedUser, this.selectedStatus);
  }

  // Load last 6 months KPI progress with optional filters
  getLast6MonthsProgress(userId?: number | null, status?: string | null): void {
    this.kpiService.getLast6MonthsProgress(userId ?? null, status ?? null)
      .subscribe({
        next: (res) => this.kpiMonthly = res,
        error: (err) => console.error('Failed to load monthly KPI progress', err),
      });
  }
}
