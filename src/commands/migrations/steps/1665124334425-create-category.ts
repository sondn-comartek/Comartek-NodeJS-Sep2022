import { Migration } from '../migrations.command';

export const name = 'create-category';
export const up = async (migration: Migration) => {
  console.log('migrate create-category: 1665124334425-create-category');
  await migration.categoryModel.create([
    {
      name: 'medical',
      imageId: '659ee608-9396-4f5a-9ef7-3db7d37ba8e1',
      widthImage: 200,
    },
    {
      name: 'sport',
      imageId: '52b81edc-e245-43f6-8ac4-a80fa1473b72',
      widthImage: 300,
    },
    {
      name: 'tech',
      imageId: '185ca9c5-99af-4259-aeab-de3444d8007f',
      widthImage: 400,
    },
  ]);
};
