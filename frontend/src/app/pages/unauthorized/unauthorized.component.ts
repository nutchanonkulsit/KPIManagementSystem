import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: false,
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css',
})
export class UnauthorizedComponent {
  getCurrentTimestamp(): string {
    return new Date().toLocaleString();
  }
}
