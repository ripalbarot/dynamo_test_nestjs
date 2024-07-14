import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NewBook } from '../domains/newBook.dto';
import { BOOK_SERVICE, IBookService } from '../services/IBook.service';
import { Book } from '../domains/book.dto';

@Controller('/books')
export class AppController {
  constructor(
    @Inject(BOOK_SERVICE) private readonly bookService: IBookService,
  ) {}

  @Get()
  index(): Book {
    const book = new Book();
    book.pk = 'BOOK#123456789';
    book.book_title = 'Test Title';
    book.isbn = '1234567890';
    return book;
  }
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() newBook: NewBook): Promise<Book> {
    return await this.bookService.createBook(newBook);
  }
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findBookById(id);
  }
}
