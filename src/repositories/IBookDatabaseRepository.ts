import { Book } from '../domains/book.dto';

export interface IBookDatabaseRepository {
  createBookItem(newBook: Book): Promise<Book>;
  findById(id: string): Promise<Book>;
}
export const BOOK_DATABASE_REPOSITORY = Symbol('Book DB Repository');
