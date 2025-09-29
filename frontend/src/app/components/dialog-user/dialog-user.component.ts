import { Component, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { DialogCreateKpiComponent } from '../dialog-create-kpi/dialog-create-kpi.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { RoleService } from '../../services/role/role.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Role } from '../../models/role';
import { UserService } from '../../services/user/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dialog-user',
  standalone: false,
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.css',
})
export class DialogUserComponent implements OnInit {
  mode: 'create' | 'edit' | 'view' = 'create';
  user: User = {
    id: null,
    username: '',
    email: '',
    password: '',
    role_id: null,
  };

  showPassword: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogUserComponent>,
    private roleService: RoleService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.mode = this.data.mode || 'create';

      if (this.data.user) {
        this.user = { ...this.data.user };

        if (this.user.role && !this.user.role_id && this.data.roles) {
          const matchedRole = this.data.roles.find(
            (r: Role) => r.name === this.user.role!.name
          );
          if (matchedRole) {
            this.user.role_id = matchedRole.id;
          }
        }
      }

      
    }
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe((res) => {
      console.log(res);
    });
  }

  createOrUpdateUser(form: NgForm) {
    if (form.invalid) return;
    console.log(this.user.id);

    if (this.mode === 'edit') {
      if (typeof this.user.id === 'number') {
        this.userService.updateUser(this.user, this.user.id).subscribe({
          next: (res: any) => {
            console.log('KPI created:', res);
            this.dialogRef.close(res);
          },
          error: (err) => console.error('Failed to create KPI', err),
        });
      } else {
        console.error('User ID is invalid for update.');
      }
    } else {
      this.authService.signup(this.user).subscribe({
        next: (res: any) => {
          console.log('KPI created:', res);
          this.dialogRef.close(res);
        },
        error: (err) => console.error('Failed to create KPI', err),
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
