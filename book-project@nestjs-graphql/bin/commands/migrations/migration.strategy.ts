import { EnityRepository } from 'src/abstract-entites'
import { v4 } from 'uuid'
import { MigrationRepository } from './migration.repository'
import { database } from './database'

export class MigrationStrategy {
   public repositories: Record<string, EnityRepository<any>>
   public entites: string[]
   constructor(
      private migrationRepository: MigrationRepository,
      repositories: Record<string, EnityRepository<any>>,
      entities: string[],
   ) {
      this.repositories = repositories
      this.entites = entities
   }
   private async run(migrateName: string) {
      const repository = this.repositories[migrateName + 'Repository']
      const data = database[migrateName + 'Data']
      await repository.Remove({})
      await repository.InsertMany(data, { ordered: false })
      await this.migrationRepository.Create({
         key: v4(),
         createdAt: new Date(),
      })
      return 'mirage ' + migrateName + " success!"
   }
   async migrate(migrateName?: string) {
      if (!migrateName)
         return Promise.all(
            this.entites.map((migrateName) => {
               return this.run(migrateName)
            }),
         )
      if (migrateName && this.entites.indexOf(migrateName) === -1)
         throw new Error(`mirgate name must be in >>> [ ${this.entites} ] `)
      return this.run(migrateName)
   }
}
