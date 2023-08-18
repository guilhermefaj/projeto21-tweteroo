import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweets } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';

@Injectable()
export class AppService {

  private users: User[]; //persistência em memória
  private tweets: Tweets[]

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getUsers() {
    return this.users;
  }

  getTweets() {
    return this.tweets;
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }

  getHealth(): string {
    return "I'm working fine!"
  }

}
