import { EnityRepository } from 'src/abstract-entites'
import { databaseInit } from '../database-init'

export const initBook = async (
   repositories: Record<string, EnityRepository<any>>,
) => {
   const { bookRepository, migrationRepository } = repositories
   await bookRepository.Remove({})
   await bookRepository.InsertMany(
    databaseInit.bookData, {
      ordered: false,
   })
   await migrationRepository.Create({
      key: initBook.name ,
      createdAt: new Date(),
   })
   return  initBook.name + ' successfully'
}
