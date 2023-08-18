import { Body, Controller, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  getHealth(): string {
    return "I'm okay!";
  }

  @Get("users")
  getUsers() {
    return this.appService.getUsers();
  }

  @Get("tweets")
  getTweets() {
    return this.appService.getTweets();
  }

  @Get("/tweets/:username")
  findOne(@Param("username") username: string) {
    console.log(username);
    return username;
  }

  @Post("sign-up")
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    try {
      if (!body.username || !body.avatar) {
        throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST)
      }
      return this.appService.createUser(body);
    } catch (error) {
      throw new HttpException("All fields are required!", HttpStatus.BAD_REQUEST)
    }
  }

  @Post("tweets")
  @HttpCode(200)
  createTweet(@Body() body: CreateTweetDto) {
    try {
      if (body.user === '') {
        throw new HttpException('Usuário não logado', HttpStatus.UNAUTHORIZED)
      }
      const username = body.user;
      const tweet = body.tweet;

      this.appService.createTweet(username, tweet);
      return 'Tweet criado com sucesso!';
    } catch (error) {
      throw new HttpException('Falha ao criar o tweet', HttpStatus.BAD_REQUEST);
    }
  }
}
