import { ConfigService } from "@nestjs/config";


export const redisConfig = (configService:ConfigService) => {
    return {
        redis: {
           host: configService.get<string>('REDIS_HOST'),
           port: configService.get<number>('REDIS_PORT'),
        },
     }
}