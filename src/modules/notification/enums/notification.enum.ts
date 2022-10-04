import { registerEnumType } from '@nestjs/graphql';
export enum NotificationTypes {
  created,
}
registerEnumType(NotificationTypes, {
  name: 'NotificationTypes',
});
