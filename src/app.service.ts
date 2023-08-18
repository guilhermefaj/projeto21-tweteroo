import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';
import { CreateUserDto } from './dtos/user.dtos';

@Injectable()
export class AppService {

  private users: User[]; //persistência em memória
  private tweets: Tweet[]

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

  createTweet(username: string, tweet: string) {
    const user = this.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Você precisa estar logado para publicar um tweet.');
    }

    const newTweet = new Tweet(user, tweet);
    this.tweets.push(newTweet);
  }

  private findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user['username'] === username);
  }
}
