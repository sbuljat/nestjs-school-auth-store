import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { StorageService } from 'src/storage/storage.service';
import { Role } from 'src/auth/role.enum';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly storageService: StorageService) {}

  async onModuleInit() {
    // Initialize the storage service only if it hasn't been initialized yet.
    if(await this.findByEmail('sbuljat@gmail.com') === undefined) {
      this.saveUser(new User("dummy0001", 'stipe', 'stipe@gmail.com', 'password123', 'Stipe Stipic'));
    }
    
    if(await this.findByEmail('jure@gmail.com') === undefined) {
      this.saveUser(new User("dummy0002", 'jure', 'jure@gmail.com', 'password321', 'Jure Juric', [Role.Admin]))
    }
    
    console.log('UsersService.onModuleInit() => done');
  }

  // Retrieve a user by their id (assumes the user is stored as a JSON string).
  async findById(id: string): Promise<User | undefined> {
    const userStr = await this.storageService.client.get(`user:id:${id}`);
    return userStr ? JSON.parse(userStr) as User: undefined;
  }

  // Retrieve a user by email. This example assumes an email-to-id mapping exists.
  async findByEmail(email: string): Promise<User | undefined> {
    const userId = await this.storageService.client.get(`user:email:${email}`);
    if (!userId) return undefined;
    return this.findById(userId);
  }

  // Retrieve a user by email. This example assumes an username-to-id mapping exists.
  async findByUsername(email: string): Promise<User | undefined> {
    const userId = await this.storageService.client.get(`user:username:${email}`);
    if (!userId) return undefined;
    return this.findById(userId);
  }

  // Retrieve all users using the KEYS command (for small datasets).
  // For larger datasets, consider using the SCAN command.
  async findAll(): Promise<User[]> {
    const keys = await this.storageService.client.keys('user:id:*');
    const pipeline = this.storageService.client.pipeline();
    keys.forEach((key) => pipeline.get(key));
    const results = await pipeline.exec();
    return results.map(([, userStr]) => (userStr ? JSON.parse(userStr as string) as User : null));
  }

  // Save or update a user. Maintains both id, username and email mappings.
  async saveUser(user: User): Promise<void> {
    const { id, username, email, password } = user;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the hashed password
    const userToSave = { ...user, password: hashedPassword };

    await this.storageService.client.set(`user:id:${id}`, JSON.stringify(userToSave));
    await this.storageService.client.set(`user:email:${email}`, id);
    await this.storageService.client.set(`user:username:${username}`, id);
  }
}
