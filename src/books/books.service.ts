import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { BookDto } from './dto/book.dto';
import { BookUpdateDto } from './dto/bookUpdate.dto';

@Injectable()
export class BooksService {
  async createBook(dto: BookDto): Promise<object | void> {
    try {
      return await admin.firestore().collection('books').add(dto);
    } catch (error) {
      console.log(error);
    }
  }
  async getBook(id: string): Promise<object | null> {
    try {
      const book = await admin.firestore().collection('books').doc(id).get();
      return { id, ...book.data() };
    } catch (error) {
      console.log(error);
    }
  }

  async getBooks(): Promise<object | null> {
    try {
      const snapshot = await admin.firestore().collection('books').get();
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(id: string, dto: BookUpdateDto): Promise<object | null> {
    try {
      const bookRef = await admin.firestore().collection('books').doc(id);
      await bookRef.update({ ...dto });
      const book = await admin.firestore().collection('books').doc(id).get();
      return book.data();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBook(id: string): Promise<object | null> {
    try {
      const book = await admin.firestore().collection('books').doc(id).get();
      await admin.firestore().collection('books').doc(id).delete();
      console.log(book.data());
      return book.data();
    } catch (e) {
      console.log(e);
    }
  }
}
