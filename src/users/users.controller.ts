import {
  Body,
  Controller,
  Get,
  Req,
  Res,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
  Render,
  Redirect,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';
import * as configApp from '../../firebaseAppKey.json';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() { email, password }): Promise<object | void> {
    const user = await this.usersService.signup({ email, password });
    console.log(user);
    if (!user) {
      throw new HttpException(
        'Ошибка создание пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() { idToken },
    @Res({ passthrough: true }) res: Response,
    @Req() request: Request,
  ): Promise<object | void> {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // admin
    //   .auth()
    //   .createSessionCookie(idToken.toString(), { expiresIn })
    //   .then(
    //     (sessionCookie) => {
    //       res.cookie('session', sessionCookie);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );

    try {
      const sessionCookie = await admin
        .auth()
        .createSessionCookie(idToken.toString(), {
          expiresIn,
        });
      console.log(sessionCookie);
      res.cookie('session', sessionCookie);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('profile')
  @Render('profile')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<object | void> {
    console.log(req.cookies);
    const sessionCookie = req.cookies.session ? req.cookies.session : null;

    if (!sessionCookie) {
      throw new HttpException('Необходима авторизация', HttpStatus.FORBIDDEN);
    }

    try {
      const { name, uid, email } = await admin
        .auth()
        .verifySessionCookie(sessionCookie);
      return { title: 'Профиль', userRecord: { name, uid, email } };
    } catch (error) {
      console.log(error);
    }
  }

  @Get('logout')
  @Redirect('login')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response): Promise<void> {
    res.clearCookie('session');
  }

  //Views
  @Get()
  @Render('index')
  async viewIndex() {
    return { title: 'Главная' };
  }

  @Get('signup')
  @Render('signup')
  async viewRegisterForm() {
    return { title: 'Регистрация' };
  }

  @Get('login')
  @Render('login')
  async viewLoginForm() {
    return { title: 'Вход', config: configApp };
  }
}
