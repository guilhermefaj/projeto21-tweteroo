import { IsNotEmpty, IsString } from "class-validator";
import { User } from "src/entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    tweet: string;
}