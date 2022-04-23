import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
  Patch,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { BOOK_CREATE_ERROR, BOOK_NOT_FOUND_ERROR } from './book.constants';
import { BookUpdateDto } from './dto/bookUpdate.dto';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: BookDto): Promise<object | void> {
    const book = await this.booksService.createBook(dto);
    console.log(dto);
    if (!book) {
      throw new HttpException(BOOK_CREATE_ERROR, HttpStatus.BAD_REQUEST);
    }
    return book;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBooks(): Promise<object | void> {
    const books = await this.booksService.getBooks();
    return books;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('id') id: string): Promise<object | void> {
    const book = await this.booksService.getBook(id);

    if (!book.hasOwnProperty('title')) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.BAD_REQUEST);
    }

    return book;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateBook(
    @Param('id') id: string,
    @Body() dto: BookUpdateDto,
  ): Promise<object | void> {
    const book = await this.booksService.updateBook(id, dto);

    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.BAD_REQUEST);
    }

    return book;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteBook(@Param('id') id: string): Promise<object | void> {
    const book = await this.booksService.deleteBook(id);
    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.BAD_REQUEST);
    }

    return book;
  }
}
