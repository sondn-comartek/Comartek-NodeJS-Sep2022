import { ConfigService } from "@nestjs/config"



export const mongoConfig = (configService:ConfigService) => {
    return {
        uri : configService.get<string>('MONGODB_URL'),
        useNewUrlParser : true ,
      }
}