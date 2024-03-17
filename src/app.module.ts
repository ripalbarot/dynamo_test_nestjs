import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { BookService } from './services/book.service';
import { DATABASE_REPOSITORY } from './repositories/IDatabaseRepository';
import { DatabaseRepository } from './repositories/DatabaseRepository';
import { BOOK_DATABASE_REPOSITORY } from './repositories/IBookDatabaseRepository';
import { BookDatabaseRepository } from './repositories/BookDatabaseRepository';
import { BOOK_SERVICE } from './services/IBook.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    BookService,
    {
      provide: DATABASE_REPOSITORY,
      useClass: DatabaseRepository,
    },
    {
      provide: BOOK_DATABASE_REPOSITORY,
      useClass: BookDatabaseRepository,
    },
    {
      provide: BOOK_SERVICE,
      useClass: BookService,
    },
  ],
})
export class AppModule {}
