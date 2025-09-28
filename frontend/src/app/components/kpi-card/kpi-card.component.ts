import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: false,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
})
export class KpiCardComponent {
  @Input() title!: string; // "On Track"
  @Input() subtitle!: string; // "Meeting targets"
  @Input() value: number = 0; // KPI count
  @Input() percent?: number; // Optional percentage
  @Input() color!: string; // tailwind base color (blue, green, yellow, red)
  @Input() iconPath!: string; // SVG path for the icon
}
