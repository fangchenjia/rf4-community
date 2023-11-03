import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  cacheSet(key: string, value: unknown, ttl = 60 * 60) {
    this.cacheManager.set(key, value, {
      ttl: ttl,
    } as any);
  }

  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  async cacheDel(key: string): Promise<any> {
    return this.cacheManager.del(key);
  }

  async cacheClear(): Promise<any> {
    return this.cacheManager.reset();
  }

  async cacheClearKey(key): Promise<any> {
    // 获取所有key
    const keys = await this.cacheManager.store.keys();
    // 删除包含key的缓存
    keys
      .filter((k) => k.includes(key))
      .forEach((k) => {
        this.cacheManager.del(k);
      });
  }
}
