import * as DataLoader from 'dataloader';
import { BookService } from '../book/book.service';
import { Book } from '../book/model/book.model';

// import { UsersService } from './users.service';

function createBooksLoader(bookService: BookService) {
    return new DataLoader<string, Book>(async (ids) => {
        const books = await bookService.findBooksByIds(ids);

        const booksMap = mapFromArray(books, (book) => book.id);

        return ids.map((id) => booksMap[id]);
    });
}

function mapFromArray(objs, ids) {
    return ids.map(
        (id) =>
            objs.filter((obj: any) => obj.id === id) || null,
    );
}

