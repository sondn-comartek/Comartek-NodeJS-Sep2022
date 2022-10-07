import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EnityRepository } from 'src/abstract-entites'
import { Migration, MigrationDocument } from './migration.schema'

Injectable()
export class MigrationRepository extends EnityRepository<MigrationDocument> {
   constructor(
      @InjectModel(Migration.name) migrationModel: Model<MigrationDocument>,
   ) {
      super(migrationModel)
   }
}
