import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: false,
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.css',
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() value!: number;
  @Input() percent?: number;
  @Input() color: 'blue' | 'green' | 'yellow' | 'red' = 'blue'; // limit to safe colors
  @Input() iconPath!: string;

  // Map Tailwind classes by color
  get colorClasses() {
    switch (this.color) {
      case 'green':
        return {
          container: 'from-green-100 to-green-200',
          text: 'text-green-600',
          badge: 'bg-green-50 text-green-600',
        };
      case 'yellow':
        return {
          container: 'from-yellow-100 to-yellow-200',
          text: 'text-yellow-600',
          badge: 'bg-yellow-50 text-yellow-600',
        };
      case 'red':
        return {
          container: 'from-red-100 to-red-200',
          text: 'text-red-600',
          badge: 'bg-red-50 text-red-600',
        };
      default: // blue
        return {
          container: 'from-blue-100 to-blue-200',
          text: 'text-blue-600',
          badge: 'bg-blue-50 text-blue-600',
        };
    }
  }
}
