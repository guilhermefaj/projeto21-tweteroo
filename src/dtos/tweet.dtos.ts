import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    user: string;

    @IsString()
    @IsNotEmpty()
    tweet: string;
}