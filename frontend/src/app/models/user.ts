import { Role } from './role';

export interface User {
  id?: number | null;
  username: string;
  email: string;
  password: string;
  role_id?: number | null;
  role?: Role; // optional nested role object
}
