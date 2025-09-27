import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('✅ Login success:', response);
        this.isLoading = false;

        // Example: store token or user data
        localStorage.setItem('token', response.token);
        this.router.navigate(['/user/kpi']);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
