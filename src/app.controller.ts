import { Body, Controller, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post, Query, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateTweetDto } from './dtos/tweet.dtos';

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

  @Get("/tweets")
  getTweets(@Query('page') page: number = 1) {
    if (isNaN(page) || page < 1) {
      throw new HttpException('Informe um número de página válido', HttpStatus.BAD_REQUEST);
    }

    return this.appService.getTweets(page);
  }


  @Get("/tweets/:username")
  findOne(@Param("username") username: string) {
    return this.appService.getUserTweets(username)
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
  createTweet(@Body() body: CreateTweetDto) {
    try {
      const username = body.username;
      const tweet = body.tweet;

      this.appService.createTweet(username, tweet);
      return 'Tweet criado com sucesso!';
    } catch (error) {
      throw error;
    }
  }
}
