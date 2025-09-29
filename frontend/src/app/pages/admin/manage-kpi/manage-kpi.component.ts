import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateKpiComponent } from '../../../components/dialog-create-kpi/dialog-create-kpi.component';
import { KpiService } from '../../../services/kpi/kpi.service';
import { Kpi } from '../../../models/kpi';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-manage-kpi',
  standalone: false,
  templateUrl: './manage-kpi.component.html',
  styleUrl: './manage-kpi.component.css',
})
export class ManageKpiComponent {
  kpis: Kpi[] = [];
  users: any = [];

  selectedStatus: any = '';
  searchText: any = '';
  selectedUser: any = '';

  constructor(
    private dialog: MatDialog,
    private kpiService: KpiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getAllKPI();
    this.getAllUser();
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

      const matchesUser = this.selectedUser
        ? kpi.assigned_user === +this.selectedUser // convert selectedUser to number
        : true;

      return matchesStatus && matchesSearch && matchesUser;
    });
  }

  getAllKPI() {
    this.kpiService.getAllKPI().subscribe((res: any) => {
      this.kpis = res.map((kpi: any) => ({
        ...kpi,
        target_value: Number(kpi.target_value),
        actual_value: Number(kpi.actual_value),
      }));

      console.log(this.kpis);
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(this.users);
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
    this.getAllKPI(); 
  }

  showCreateModal() {
    const dialogRef = this.dialog.open(DialogCreateKpiComponent, {
      width: '800px',
      maxWidth: '80dvw',
      // height: '90dvh',
      maxHeight: '90dvh',
      // panelClass: 'custom-dialog',
      data: {
        title: 'Create New KPI',
        users: this.users,
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllKPI();
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
