
import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configservice:ConfigService) {
        const client = createClient({
            socket: {
                host:configservice.get('redis_server_host'),
                port: configservice.get('redis_server_port')
            },
            database: configservice.get('redis_server_db')
        });
        await client.connect();
        return client;
      },
      inject:[ConfigService]
    }
  ],
  exports: [RedisService]
})
export class RedisModule {}
