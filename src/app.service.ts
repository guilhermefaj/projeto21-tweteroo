import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  getTweets(page: number): Tweet[] {
    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage;
    const endIndex = startIndex + tweetsPerPage;
    return this.tweets.slice(startIndex, endIndex);
  }


  getUserTweets(username: string): Tweet[] {
    const userTweets: Tweet[] = this.tweets.filter((tweet) => {
      return tweet.getUsername() === username
    })

    return userTweets;
  }

  createUser(body: CreateUserDto) {
    const user = new User(body.username, body.avatar)
    return this.users.push(user);
  }

  createTweet(username: string, tweet: string) {
    const user = this.findUserByUsername(username);

    if (!user) {
      throw new HttpException('Você precisa estar logado para publicar um tweet.', HttpStatus.UNAUTHORIZED);
    }

    const newTweet = new Tweet(username, user.getAvatar(), tweet);
    this.tweets.push(newTweet);
  }

  private findUserByUsername(username: string): User {
    return this.users.find((user) => user.getUsername() === username);
  }
}
