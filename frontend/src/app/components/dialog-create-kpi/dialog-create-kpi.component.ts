import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Kpi } from '../../models/kpi';
import { KpiService } from '../../services/kpi/kpi.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-create-kpi',
  standalone: false,
  templateUrl: './dialog-create-kpi.component.html',
  styleUrl: './dialog-create-kpi.component.css',
})
export class DialogCreateKpiComponent {
  kpi: Kpi = {
    title: '',
    description: '',
    target_value: 0,
    actual_value: 0,
    status: null,
    assigned_user: 1,
    start_date: this.getToday(),
    end_date: this.getToday(),
  };

  getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogCreateKpiComponent>,
    private kpiService: KpiService
  ) {}

  createKPI(form: NgForm) {
    if (form.invalid) return;

    console.log(this.kpi);

    this.kpiService.createKPI(this.kpi).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Failed to create KPI', err);
      },
    });
  }

  onSubmit() {
    console.log(this.kpi);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
