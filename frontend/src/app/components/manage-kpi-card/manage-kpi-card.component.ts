import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KpiService } from '../../services/kpi/kpi.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateKpiComponent } from '../dialog-create-kpi/dialog-create-kpi.component';
import { Kpi } from '../../models/kpi';
import { DialogKpiUpdateComponent } from '../dialog-kpi-update/dialog-kpi-update.component';

@Component({
  selector: 'app-manage-kpi-card',
  standalone: false,
  templateUrl: './manage-kpi-card.component.html',
  styleUrl: './manage-kpi-card.component.css',
})
export class ManageKpiCardComponent {
  @Input() users!: any;
  @Input() kpi!: Kpi;
  @Input() statusColor!: string; // green / yellow / red
  @Input() progressPercent: number = 0; // calculated percent
  @Input() iconPath?: string; // optional SVG path
  @Input() userData?: any;
  @Output() deleted = new EventEmitter<number>();
  @Output() updated = new EventEmitter<void>();

  constructor(private kpiService: KpiService, private dialog: MatDialog) {}

  ngOnInit() {}
  // Optional: default icon if not provided
  getIconPath(): string {
    return (
      this.iconPath ||
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    );
  }
  deleteKPI() {
    this.kpiService.deleteKPI(this.kpi.id!).subscribe({
      next: (res: any) => {
        console.log(res);
        this.deleted.emit(this.kpi.id!);
      },
      error: () => {},
    });
  }

  openEditDialog(kpi: Kpi) {
    const dialogRef = this.dialog.open(DialogCreateKpiComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        title: 'Edit KPI',
        mode: 'edit',
        kpi,
        users: this.users,
        userData: this.userData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updated.emit();
      }
    });
  }

  openViewDialog(kpi: Kpi) {
    const dialogRef = this.dialog.open(DialogCreateKpiComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        title: 'View KPI',
        mode: 'view',
        kpi,
        users: this.users,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openUpdateDialog(kpi: Kpi) {
    const dialogRef = this.dialog.open(DialogKpiUpdateComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        kpi,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
