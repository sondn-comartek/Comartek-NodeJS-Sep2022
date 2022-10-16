import {
   Document,
   Model,
   FilterQuery,
   QueryOptions,
   ProjectionType,
   UpdateQuery,
   InsertManyOptions,
} from 'mongoose'

export abstract class EnityRepository<T extends Document> {
   constructor(protected readonly EntityModel: Model<T>) {}

   async Create(EntityData: unknown): Promise<T> {
      const Entity = new this.EntityModel(EntityData)
      return await Entity.save()
   }

   async FindAll(
      Filter?: FilterQuery<T>,
      Projection?: ProjectionType<T>,
      Option?: QueryOptions,
   ): Promise<T[] | null> {
      return await this.EntityModel.find(Filter, Projection, {
         lean: true,
         // sort : { createdAt : 1 } ,
         ...Option,
      })
   }

   async FindOne(
      Filter: FilterQuery<T>,
      Projection?: ProjectionType<T>,
      Option?: QueryOptions,
   ): Promise<T | null> {
      return await this.EntityModel.findOne(Filter, Projection, {
         lean: true,
         ...Option,
      })
   }

   async FindOneAndUpdate(
      Filter: FilterQuery<T>,
      Update: UpdateQuery<T>,
      Option?: QueryOptions,
   ): Promise<T | null> {
      return await this.EntityModel.findOneAndUpdate(Filter, Update, Option)
   }

   async FindOneAndDelete(
      Filter: FilterQuery<T>,
      Option?: QueryOptions,
   ): Promise<T | null> {
      return await this.EntityModel.findOneAndDelete(Filter, Option)
   }

   async UpdateMany(
      Filter: FilterQuery<T>,
      Update: UpdateQuery<T>,
      Option?: QueryOptions,
   ) {
      return await this.EntityModel.updateMany(Filter, Update, Option)
   }

   async InsertMany(EntitesData: unknown[], Options?: InsertManyOptions) {
      return await this.EntityModel.insertMany(EntitesData, Options)
   }

   async Remove(Filter: FilterQuery<T>) {
      return await this.EntityModel.remove(Filter)
   }
}
