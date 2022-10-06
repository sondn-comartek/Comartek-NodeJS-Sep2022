import { EnityRepository } from 'src/abstract-entites'
import { convertToTimestamp, initBook, initCategory, initUser } from './steps'

export class MigrationStrategy {
   private migrations = {
      initUser: initUser,
      initBook: initBook,
      initCategory: initCategory,
      convertToTimestamp: convertToTimestamp,
   }
   constructor(private repositories: Record<string, EnityRepository<any>>) {}

   private async run(migrateName?: string | any) {
      const migrationKeys = Object.keys(this.migrations)
      const keysRan = []
      const keysNeededRun = []
      if (!migrateName) {
         const migrations = await this.repositories[
            'migrationRepository'
         ].FindAll(
            {
               key: { $in: migrationKeys },
            },
            'key',
         )
         if (migrations.length == 0) {
            keysNeededRun.push(...migrationKeys)
         } else {
            migrations.map((migration) => {
               return keysRan.push(migration.key)
            })
            migrationKeys.forEach((key) => {
               if (!keysRan.includes(key)) keysNeededRun.push(key)
            })
         }
      } else {
         keysNeededRun.push(migrateName)
      }
      return Promise.all(
         keysNeededRun.map((key) => {
            return this.migrations[key](this.repositories)
         }),
      )
   }
   async migrate(migrateName?: string) {
      return this.run(migrateName)
   }
}
