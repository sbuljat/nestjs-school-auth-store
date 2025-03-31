import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class StorageService implements OnModuleInit, OnModuleDestroy {
  public client: RedisClient;

  async onModuleInit() {
    // Connect using a single Redis URL (e.g., redis://:password@host:port)
    const redisUrl = process.env.REDIS_URL || 'rediss://red-cvl620t6ubrc73bfrtsg:M7N69p3zhz7rAwdNIoOzzxs2wYfhgED2@frankfurt-keyvalue.render.com:6379';
    this.client = new Redis(redisUrl);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}