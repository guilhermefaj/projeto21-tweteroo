import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsUrl()
    avatar: string;
}