import { registerEnumType } from '@nestjs/graphql';

export enum MimetypeEnum {
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  PNG = 'image/PNG',
}

registerEnumType(MimetypeEnum, {
  name: 'MimetypeEnum',
});
