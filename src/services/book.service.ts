import { Inject, Injectable } from '@nestjs/common';
import { IBookService } from './IBook.service';
import { NewBook } from '../domains/newBook.dto';
import { Book } from '../domains/book.dto';
import { BOOK_DATABASE_REPOSITORY } from '../repositories/IBookDatabaseRepository';
import { BookDatabaseRepository } from '../repositories/BookDatabaseRepository';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class BookService implements IBookService {
  constructor(
    @Inject(BOOK_DATABASE_REPOSITORY)
    private readonly bookDBRepo: BookDatabaseRepository,
  ) {}
  async createBook(newBook: NewBook): Promise<Book> {
    const book = new Book();
    const uuid = uuid_v4().toString();
    book.pk = uuid.replace(/-/gi, '');
    book.book_title = newBook.book_title;
    book.isbn = newBook.isbn;
    return await this.bookDBRepo.createBookItem(book);
  }

  async findBookById(id: string): Promise<Book> {
    return await this.bookDBRepo.findById(id);
  }
}
