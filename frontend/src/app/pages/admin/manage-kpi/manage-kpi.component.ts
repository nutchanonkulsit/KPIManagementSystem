import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateKpiComponent } from '../../../components/dialog-create-kpi/dialog-create-kpi.component';
import { KpiService } from '../../../services/kpi/kpi.service';
import { Kpi } from '../../../models/kpi';

@Component({
  selector: 'app-manage-kpi',
  standalone: false,
  templateUrl: './manage-kpi.component.html',
  styleUrl: './manage-kpi.component.css',
})
export class ManageKpiComponent {
  kpis: Kpi[] = [];
  constructor(private dialog: MatDialog, private kpiService: KpiService) {}

  ngOnInit() {
    this.getAllKPI();
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

  showCreateModal() {
    const dialogRef = this.dialog.open(DialogCreateKpiComponent, {
      width: '800px',
      maxWidth: '80dvw',
      // height: '90dvh',
      maxHeight: '90dvh',
      // panelClass: 'custom-dialog',
      data: {
        title: 'Create New KPI',
      },
    });

    dialogRef.afterClosed();
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
