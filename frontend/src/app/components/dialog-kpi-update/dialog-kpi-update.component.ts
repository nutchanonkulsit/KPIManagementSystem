import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KpiUpdateService } from '../../services/kpi_update/kpi-update.service';
import { KpiUpdate } from '../../models/kpi-update';

@Component({
  selector: 'app-dialog-kpi-update',
  standalone: false,
  templateUrl: './dialog-kpi-update.component.html',
  styleUrls: ['./dialog-kpi-update.component.css'], // fixed
})
export class DialogKpiUpdateComponent implements OnInit {
  kpiUpdate: KpiUpdate = {
    kpi_id: 0,
    updated_value: null,
    updated_by: 0,
    comment: null,
  };
  update_value: number | null = null; // default to 0

  kpi: any;
  currentUser: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private dialogRef: MatDialogRef<DialogKpiUpdateComponent>,
    private kpiUpdateService: KpiUpdateService
  ) {}

  ngOnInit(): void {
    this.kpi = this.data.kpi;
    this.currentUser = this.data.currentUser;
    this.kpiUpdate.kpi_id = this.kpi.id;
    this.kpiUpdate.updated_by = this.currentUser.id;
  }

  updateKPI(form: NgForm): void {
    this.kpiUpdateService.createKPIUpdate(this.kpiUpdate).subscribe({
      next: (res) => {
        console.log('KPI updated successfully', res);
        this.dialogRef.close(res); // return updated KPI
      },
      error: (err) => {
        console.error('Failed to update KPI', err);
      },
    });
  }

  get new_value(): number {
    return this.kpi.actual_value + (this.kpiUpdate.updated_value || 0);
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
