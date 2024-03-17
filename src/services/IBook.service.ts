import { NewBook } from '../domains/newBook.dto';
import { Book } from '../domains/book.dto';

export interface IBookService {
  createBook(newBook: NewBook): Promise<Book>;
  findBookById(id: string): Promise<Book>;
}

export const BOOK_SERVICE = Symbol('Book Service');
