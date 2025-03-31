import { Role } from 'src/auth/role.enum';

export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public name: string,
    public roles: Role[] = [Role.User], // Default to [Role.User] if no roles are provided
  ) {}
}
