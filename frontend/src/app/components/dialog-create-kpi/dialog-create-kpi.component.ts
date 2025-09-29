import { Component, Inject, Input } from '@angular/core';
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
  mode: 'create' | 'edit' | 'view' = 'create';
  kpi: Kpi = {
    title: '',
    description: '',
    target_value: null,
    actual_value: null,
    status: null,
    assigned_user: null,
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

  ngOnInit() {
    if (this.data) {
      this.mode = this.data.mode || 'create';
      
      if (this.data.kpi) {
        // populate form with KPI to edit/view
        this.kpi = { ...this.data.kpi };
      }
    }
  }

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

  createOrUpdateKPI(form: NgForm) {
    if (form.invalid) return;

    if (this.mode === 'edit') {
      this.kpiService.updateKPI(this.kpi).subscribe({
        next: (res: any) => {
          console.log('KPI updated:', res);
          this.dialogRef.close(res);
        },
        error: (err) => console.error('Failed to update KPI', err),
      });
    } else {
      this.kpiService.createKPI(this.kpi).subscribe({
        next: (res: any) => {
          console.log('KPI created:', res);
          this.dialogRef.close(res);
        },
        error: (err) => console.error('Failed to create KPI', err),
      });
    }
  }

  checklog() {
    console.log(this.kpi);
  }

  onSubmit() {
    console.log(this.kpi);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
