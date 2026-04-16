import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters' })
    @MaxLength(50, { message: 'Name is too long' })
    name: string;

    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must have 6 characters' })
    @MaxLength(128, { message: 'The password is too long' })
    password: string;
}