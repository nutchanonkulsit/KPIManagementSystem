import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
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
        localStorage.setItem('role', response.user.role);

        if (response.user.role === 'admin') {
          this.router.navigate(['/admin/manage-kpi']);
        } else {
          this.router.navigate(['/user/kpi']);
        }
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
