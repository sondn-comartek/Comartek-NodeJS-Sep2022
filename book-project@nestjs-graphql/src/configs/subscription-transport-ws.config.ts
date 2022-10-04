import { UnauthorizedException } from "@nestjs/common"

export const onConnect = (params:unknown) => {
   if(!params['Authorization']) throw new UnauthorizedException()
   params['authorization'] = params['Authorization']
   delete params['Authorization']
   return {
      req: {
         headers: params
      },
   }
}
