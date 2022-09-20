import {
    Document,
    Model,
    FilterQuery,
    QueryOptions,
    ProjectionType,
    UpdateQuery,
} from "mongoose";

export abstract class EnityRepository<T extends Document> {
    constructor(protected readonly EntityModel: Model<T>) {}

    async Create(EntityData: unknown): Promise<T> {
        const Entity = new this.EntityModel(EntityData)
        return await Entity.save();
    }

    async FindAll(
        Filter?: FilterQuery<T> ,
        Projection?: ProjectionType<T>,
        Option?: QueryOptions
    ): Promise<T[] | null> {
        return await this.EntityModel.find({
            Filter,
            Projection,
            Option
        })
    }

    async FindOne(
        Filter: FilterQuery<T>,
        Projection?: ProjectionType<T>,
        Option?: QueryOptions
    ): Promise<T | null> {
        return await this.EntityModel.findOne(
            Filter,
            Projection,
            Option,
        )
    }

    async FindOneAndUpdate(
        Filter: FilterQuery<T>,
        Update: UpdateQuery<T>,
        Option?: QueryOptions
    ): Promise<T | null> {
        return await this.EntityModel.findOneAndUpdate(
            Filter,
            Update,
            Option
        ).exec();
    }

    async FindOneAndDelete(
        Filter: FilterQuery<T>,
        Option?: QueryOptions
    ): Promise<T | null> {
        return await this.EntityModel.findOneAndDelete(
            Filter,
            Option
        ).exec();
    }
}