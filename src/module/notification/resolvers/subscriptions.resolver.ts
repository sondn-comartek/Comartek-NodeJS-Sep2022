import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { Roles } from "src/module/auth/decorators/roles.decorator";
import { Role } from "src/module/auth/enums/role.enum";
import { JwtAuthGuard } from "src/module/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/module/auth/guards/roles.guard";
import { BooksService } from "src/module/books/books.service";
import { PubsubService } from "src/module/pubsub/pubsub.service";
import { RentBook } from "src/module/rent/entities/rent.entity";
import { RentService } from "src/module/rent/rent.service";
import { Notification } from "../entities/notification.entity";
import { NotificationType } from "../enums/notification-type.enum";

@Resolver(() => Notification)
export class NotificationSubscriptionsResolver {
  constructor(
    private readonly pubSubService: PubsubService,
    private readonly rentService: RentService,
    private readonly booksService: BooksService
  ) {

  }

  @Subscription(() => Notification, {
    name: 'bookRentMsg',
    resolve: (payload: any) => payload
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getBookRentMsg() {
    return this.pubSubService.subscribeEvent(NotificationType.BOOK_RENT);
  }

  @Subscription(() => Notification, {
    name: 'approvedRentMsg',
    resolve: (payload: any) => payload
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async getApprovedRentMsg() {
    return this.pubSubService.subscribeEvent(NotificationType.RENT_ACCEPTED);
  }

  @Subscription(() => Notification, {
    name: 'rejectedRentMsg',
    resolve: (payload: any) => payload
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async getRejectedRentMsg() {
    return this.pubSubService.subscribeEvent(NotificationType.RENT_REJECTED);
  }

  @ResolveField(() => RentBook, { name: 'rentInfo' })
  async getRentInfo(@Parent() notification: Notification) {
    return await this.rentService.findById(notification.data);
  }

  @Subscription(() => Notification, {
    name: 'bookAddedMsg',
    resolve: (payload: any) => payload
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async getBookAddedMsg() {
    return this.pubSubService.subscribeEvent(NotificationType.BOOK_ADDED);
  }

  @ResolveField(() => RentBook, { name: 'bookInfo' })
  async getBookInfo(@Parent() notification: Notification) {
    return await this.booksService.findById(notification.data);
  }
}