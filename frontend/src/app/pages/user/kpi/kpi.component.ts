import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { KpiService } from '../../../services/kpi/kpi.service';
import { DialogCreateKpiComponent } from '../../../components/dialog-create-kpi/dialog-create-kpi.component';
import { Kpi } from '../../../models/kpi';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-kpi',
  standalone: false,
  templateUrl: './kpi.component.html',
  styleUrl: './kpi.component.css',
})
export class KpiComponent {
  kpis: Kpi[] = [];
  users: any = [];
  userData: any;
  currentUser: any;

  selectedStatus: any = '';
  searchText: any = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private kpiService: KpiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.getAllKPI();
    this.getAllUser();

    this.userData = this.getUserFromStorage();
    if (this.userData && this.userData.id) {
      this.getKPIByUserID(this.userData.id);
    }
  }

  getUserFromStorage(): any {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.currentUser = userStr ? JSON.parse(userStr) : null;

        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Failed to parse user from storage', e);
        }
      }
    }
    return null;
  }

  get filteredKpis(): Kpi[] {
    return this.kpis.filter((kpi) => {
      const matchesStatus = this.selectedStatus
        ? kpi.status === this.selectedStatus
        : true;

      const matchesSearch = this.searchText
        ? kpi.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          (kpi.description
            ?.toLowerCase()
            .includes(this.searchText.toLowerCase()) ??
            false)
        : true;

      return matchesStatus && matchesSearch;
    });
  }

  getAllKPI() {
    this.kpiService.getAllKPI().subscribe((res: any) => {
      this.kpis = res.map((kpi: any) => ({
        ...kpi,
        target_value: Number(kpi.target_value),
        actual_value: Number(kpi.actual_value),
      }));
    });
  }

  getKPIByUserID(userId: number) {
    this.kpiService.getKPIByUserID(userId).subscribe((res: any) => {
      console.log('KPI by user:', res);
      this.kpis = res.map((kpi: any) => ({
        ...kpi,
        target_value: Number(kpi.target_value),
        actual_value: Number(kpi.actual_value),
      }));
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: () => {},
    });
  }

  deleteKPI(id: number) {
    this.kpiService.deleteKPI(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: () => {},
    });
  }

  onKpiDeleted(deletedId: number) {
    // Remove the deleted KPI from the list
    this.kpis = this.kpis.filter((k) => k.id !== deletedId);

    // Or optionally, call API again:
    // this.getAllKPI();
  }

  onKPIUpdated() {
    this.getKPIByUserID(this.userData.id);
  }

  showCreateModal() {
    const dialogRef = this.dialog.open(DialogCreateKpiComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        title: 'Create New KPI',
        users: this.users,
        mode: 'create',
        userData: this.userData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getKPIByUserID(this.userData.id);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'On Track':
        return 'green';
      case 'At Risk':
        return 'yellow';
      case 'Off Track':
        return 'red';
      default:
        return 'gray';
    }
  }

  getProgressPercent(kpi: Kpi): number {
    if (!kpi.actual_value || !kpi.target_value) return 0;
    return (Number(kpi.actual_value) / Number(kpi.target_value)) * 100;
  }

  // showCreateModal() {
  //   this.dialog.open(DialogCreateKpiComponent, {
  //     width: '100dvw',
  //     height: '100dvh',
  //     maxWidth: '100dvw',
  //     maxHeight: '100dvh',
  //     data: {
  //       title: 'Create New KPI',
  //     },
  //   });
  // }
}
