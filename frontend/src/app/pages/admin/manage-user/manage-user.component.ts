import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../../../components/dialog-user/dialog-user.component';
import { RoleService } from '../../../services/role/role.service';

@Component({
  selector: 'app-manage-user',
  standalone: false,
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  users: any = [];
  roles: any = [];

  selectedRole: string | null = null;
  searchText: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.getAllUser();
    this.getAllRole();
  }

  get filteredUsers(): any[] {
    return this.users.filter((user: any) => {
      // Match search text (name or email)
      const matchesSearch = this.searchText
        ? user.username.toLowerCase().includes(this.searchText.toLowerCase()) ||
          (user.email?.toLowerCase().includes(this.searchText.toLowerCase()) ??
            false)
        : true;

      // Match selected role
      const matchesRole = this.selectedRole
        ? user.role?.name === this.selectedRole
        : true;

      return matchesSearch && matchesRole;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe((res) => {
      this.users = res;
    });
  }

  getAllRole() {
    this.roleService.getAllRole().subscribe((res) => {
      this.roles = res;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.users = this.users.filter((u: any) => u.id !== id);
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        mode: 'create',
        roles: this.roles,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUser();
      }
    });
  }

  openEditModal(user: any) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        mode: 'edit',
        roles: this.roles,
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllUser();
      }
    });
  }

  openViewModal(user: any) {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      width: '800px',
      maxWidth: '80dvw',
      maxHeight: '90dvh',
      data: {
        mode: 'view',
        roles: this.roles,
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
