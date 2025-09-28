import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manage-kpi-card',
  standalone: false,
  templateUrl: './manage-kpi-card.component.html',
  styleUrl: './manage-kpi-card.component.css',
})
export class ManageKpiCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() actualValue: number = 0; // actual_value
  @Input() targetValue: number = 0 //target_value
  @Input() progressPercent: number = 0; // calculated percent
  @Input() status!: string; // On Track / At Risk / Off Track
  @Input() statusColor!: string; // green / yellow / red
  @Input() assignedTo!: string | number;
  @Input() dueDate!: string;
  @Input() iconPath?: string; // optional SVG path

  // Optional: default icon if not provided
  getIconPath(): string {
    return (
      this.iconPath ||
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    );
  }
}
