import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    new User(1, 'stipe', 'password123', 'Stipe Stipic'),
    new User(2, 'jure', 'password321', 'Jure Juric', Role.Admin),
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
