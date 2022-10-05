import { Migration } from '../migrations.command';

export const name = 'create-book';
export const up = async (migration: Migration) => {
  console.log('migrate create-book: 1644978279531-create-book');
  await migration.bookModel.create({
    categoryId: '29faa23e-46cd-42d7-89db-77fbba8bab14',
    name: 'Harry Potter',
    part: 1,
    numberOfPages: 100,
    quantity: 5,
    imageId: 'dhskdh',
    widthImage: 400,
  });
};
