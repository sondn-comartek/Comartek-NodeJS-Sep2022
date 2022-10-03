import { registerEnumType } from '@nestjs/graphql';

export enum NotificationTypeEnum {
  BOOK_ADDED = 'BOOK_ADDED',
  RENT_ACCEPTED = 'RENT_ACCEPTED',
  RENT_DENIED = 'RENT_DENIED',
  RENT_CREATED = 'RENT_CREATED',
}

registerEnumType(NotificationTypeEnum, {
  name: 'NotificationTypeEnum',
});
