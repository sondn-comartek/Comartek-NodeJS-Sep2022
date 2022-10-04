import { Resolver, Subscription } from "@nestjs/graphql";
import { PubSubService } from "src/modules/pubsub/pubsub.service";
import { Book } from "../schemas/book.schema";

@Resolver(() => Book)
export class BookSubscriptionResolver {
    constructor(private readonly pubSubService: PubSubService) { }

    @Subscription(() => Book, {
        resolve: (book: Book) => {
            return book
        }
    })
    bookAdded() {
        return this.pubSubService.listenEvent('bookAdded')
    }
}