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

@Controller()
export class AppController {
  constructor(
    @Inject(BOOK_SERVICE) private readonly bookService: IBookService,
  ) {}

  @Get()
  index(): string {
    return 'findAll';
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
