// import { Resolver, Subscription } from "@nestjs/graphql";
// import { NotificationType } from "src/module/notification/enums/notification-type.enum";
// import { PubsubService } from "src/module/pubsub/pubsub.service";
// import { RentBook } from "../entities/rent.entity";

// @Resolver(() => RentBook)
// export class RentSubscriptionsResolver {
//   constructor(
//     private readonly pubSubService: PubsubService,
//   ) {

//   }

//   @Subscription(() => RentBook, {
//     resolve(payload: any) {
//         return payload
//     },
//   })
//   async getRentBook() {
//     console.log(this.pubSubService.subscribeEvent(NotificationType.BOOK_RENT))
//     return this.pubSubService.subscribeEvent(NotificationType.BOOK_RENT);
//   }
// }