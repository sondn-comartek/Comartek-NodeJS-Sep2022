import { Migration } from '../migrations.command';

export const name = 'create-category';
export const up = async (migration: Migration) => {
  console.log('migrate create-category: 1655998279531-create-category');
  await migration.categoryModel.create({
    name: 'history',
    imageId: '86f783bc-c46c-4c3a-8fae-142270a68130',
    widthImage: 400,
  });
};
