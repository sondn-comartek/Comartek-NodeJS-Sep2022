import { EnityRepository } from 'src/abstract-entites'
import { databaseInit } from '../database-init'

export const initCategory = async (
   repositories: Record<string, EnityRepository<any>>,
) => {
   const { categoryRepository, migrationRepository } = repositories
   await categoryRepository.Remove({})
   await categoryRepository.InsertMany(databaseInit.categoryData, {
      ordered: false,
   })
   await migrationRepository.Create({
      key: initCategory.name ,
      createdAt: new Date(),
   })
   return initCategory.name + ' successfully'
}
