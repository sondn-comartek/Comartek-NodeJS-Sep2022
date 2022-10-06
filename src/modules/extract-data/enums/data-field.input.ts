import { registerEnumType } from '@nestjs/graphql';

export enum DataFieldEnum {
  RENT = 'RENT',
  BOOK = 'BOOK',
  CATEGORY = 'CATEGORY',
}

registerEnumType(DataFieldEnum, {
    name: "DataFieldEnum"
})
