import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  async signup({ email, password }): Promise<object | void> {
    admin
      .auth()
      .createUser({ email, password })
      .then((userCredential) => {
        console.log('Successfully created new user:', userCredential.uid);
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
      });
  }
  // async getUser(uid: string): Promise<object | void> {
  //   admin
  //     .auth()
  //     .getUser(uid)
  //     .then((userRecord) => {
  //       console.log(`fetched user data: ${userRecord.toJSON()}`);
  //       return userRecord.toJSON();
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching user data:', error);
  //     });
  // }
}
