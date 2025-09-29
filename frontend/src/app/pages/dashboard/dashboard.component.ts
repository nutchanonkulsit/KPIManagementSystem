import { Component } from '@angular/core';
import { KpiService } from '../../services/kpi/kpi.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  totalKPI: number = 0;
  onTrackKPI: number = 0;
  atRiskKPI: number = 0;
  offTrackKPI: number = 0;

  onTrackPercent: number = 0;
  atRiskPercent: number = 0;
  offTrackPercent: number = 0;

  constructor(private kpiService: KpiService) {}

  ngOnInit() {
    this.countKPI();
  }

  countKPI() {
    this.getKPICount();
    this.getKPICountByOnTrack();
    this.getKPICountByAtRisk();
    this.getKPICountByOffTrack();
  }

  getKPICount() {
    this.kpiService.getKPICount().subscribe({
      next: (res: any) => {
        this.totalKPI = res.totalKPI;
        // console.log(this.totalKPI);
      },
      error: (error) => {
        console.error('Failed to load KPI count:', error);
      },
    });
  }

  getKPICountByOnTrack() {
    // this.kpiService.getKPICountByStatus(['Off Track']).subscribe((res) => {
    //   console.log('Counts:', res);
    // });
    this.kpiService.getKPICountByStatus(['On Track']).subscribe({
      next: (res: any) => {
        this.onTrackKPI = res.count;
        this.calculatePercentages();
        // console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getKPICountByAtRisk() {
    this.kpiService.getKPICountByStatus(['At Risk']).subscribe({
      next: (res: any) => {
        this.atRiskKPI = res.count;
        this.calculatePercentages();
        // console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getKPICountByOffTrack() {
    this.kpiService.getKPICountByStatus(['Off Track']).subscribe({
      next: (res: any) => {
        this.offTrackKPI = res.count;
        this.calculatePercentages();
        // console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  calculatePercentages() {
    if (this.totalKPI > 0) {
      this.onTrackPercent = Math.round((this.onTrackKPI / this.totalKPI) * 100);
      this.atRiskPercent = Math.round((this.atRiskKPI / this.totalKPI) * 100);
      this.offTrackPercent = Math.round(
        (this.offTrackKPI / this.totalKPI) * 100
      );
    } else {
      this.onTrackPercent = this.atRiskPercent = this.offTrackPercent = 0;
    }
  }
}
