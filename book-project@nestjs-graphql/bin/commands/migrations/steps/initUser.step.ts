import { EnityRepository } from 'src/abstract-entites'
import { databaseInit } from '../database-init'

export const initUser = async (
   repositories: Record<string, EnityRepository<any>>,
) => {
    console.log('running')
   const { userRepository, migrationRepository } = repositories
   await userRepository.Remove({})
   await userRepository.InsertMany(databaseInit.userData, {
      ordered: false,
   })
   await migrationRepository.Create({
      key: initUser.name,
      createdAt: new Date(),
   })
   return  initUser.name + ' successfully'
}
