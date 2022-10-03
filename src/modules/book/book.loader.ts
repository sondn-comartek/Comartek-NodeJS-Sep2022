import * as DataLoader from 'dataloader';
import { BookService } from './book.service';
import { Book } from './model/book.model';




function createUsersLoader(bookService: BookService) {
    return new DataLoader<string, Book>(async (ids) => {
        const books = await bookService.findBooksByIds(ids);

        const booksMap = mapFromArray(books, (book) => book.id);

        return ids.map((id) => booksMap[id]);
    });
}

function mapFromArray(books, ids) {
    return ids.map(
        (id) =>
            books.filter((book: Book) => book.id === id) || null,
    );
}
