import { IsNotEmpty, IsString } from "class-validator";

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    tweet: string;
}