import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-kpi-update',
  standalone: false,
  templateUrl: './dialog-kpi-update.component.html',
  styleUrl: './dialog-kpi-update.component.css',
})
export class DialogKpiUpdateComponent {
  kpiData: any;
  kpiList: any;
  selectedKPI: any;

  kpi: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogKpiUpdateComponent>
  ) {}

  ngOnInit() {
    this.kpi = this.data.kpi;
    console.log(this.kpi);
  }
  updateKPI(form: NgForm) {}

  closeModal() {
    this.dialogRef.close();
  }
}
