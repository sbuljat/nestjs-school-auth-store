import { Role } from 'src/auth/role.enum';

export class User {
  id: number;
  username: string;
  password: string;
  roles: Role[];
  name: string;

  constructor(
    id: number,
    username: string,
    password: string,
    name: string,
    role?: Role,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    if (role) {
      this.roles = [role];
    } else {
      this.roles = [Role.User];
    }
    this.name = name;
  }
}
