export class TweetWithoutAvatar {
    private username: string;
    private tweet: string;

    constructor(username: string, tweet: string) {
        this.username = username;
        this.tweet = tweet;
    }

    getTweet(): string {
        return this.tweet;
    }

    getUsername(): string {
        return this.username;
    }
}

export class Tweet extends TweetWithoutAvatar {
    private avatar: string;

    constructor(username: string, avatar: string, tweet: string) {
        super(username, tweet);
        this.avatar = avatar;
    }
}