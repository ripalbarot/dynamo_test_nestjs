import { Inject, Injectable } from '@nestjs/common';
import { IBookDatabaseRepository } from './IBookDatabaseRepository';
import {
  DATABASE_REPOSITORY,
  IDatabaseRepository,
} from './IDatabaseRepository';
import { Book } from '../domains/book.dto';

@Injectable()
export class BookDatabaseRepository implements IBookDatabaseRepository {
  private getIdForDB = (id: string) => 'BOOK#' + id;
  private getResult = (book: Book) => {
    book.pk = book.pk.substring(5);
    return book;
  };
  constructor(
    @Inject(DATABASE_REPOSITORY)
    private readonly dbRepository: IDatabaseRepository<Book>,
  ) {}
  async createBookItem(newBook: Book): Promise<Book> {
    newBook.pk = this.getIdForDB(newBook.pk);
    try {
      const book = await this.dbRepository.save(newBook);
      return this.getResult(book);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const book = await this.dbRepository.findById(this.getIdForDB(id));
      return this.getResult(book);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
