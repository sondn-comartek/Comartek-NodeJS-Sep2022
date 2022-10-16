import { EnityRepository } from 'src/abstract'
import { MigrationSteps } from './migration.interface'
import { convertToTimestamp, initBook, initCategory, initUser } from './steps'

export class MigrationStrategy {
   private migrationSteps: MigrationSteps = {
      initUser: initUser,
      initBook: initBook,
      initCategory: initCategory,
      convertToTimestamp: convertToTimestamp,
   }

   constructor(private repositories: Record<string, EnityRepository<any>>) {}
   private async run(migrateName?: string | any): Promise<Promise<any>[]> {
      const migrationKeys = Object.keys(this.migrationSteps)
      const keysRan: string[] = []
      const keysNeededRun: string[] = []
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
         if (migrationKeys.includes(migrateName))
            keysNeededRun.push(migrateName)
         throw new Error(`migrateName must be in [ ${migrationKeys} ]`)
      }
      return Promise.all(
         keysNeededRun.map((key) => {
            return this.migrationSteps[key](this.repositories)
         }),
      )
   }
   async migrate(migrateName?: string): Promise<any> {
      return this.run(migrateName)
   }
}
