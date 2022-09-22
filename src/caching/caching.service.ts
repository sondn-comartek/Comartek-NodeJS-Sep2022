import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setValue(key: string, value: string) {
    await this.cacheManager.set(key, value, { ttl: 1000 });
  }

  async getValueByKey(key: string) {
    return await this.cacheManager.get(key);
  }

  async deleteValueByKey(key: string) {
    await this.cacheManager.del(key);
  }
}
