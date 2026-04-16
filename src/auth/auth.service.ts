import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        const userExists = await this.userService.findOneByEmail(email);
        if (userExists) {
            throw new BadRequestException('This email is already registered');
        }
        
        // Gen the hash with bcrypt
        try {
            const salt =  await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = {
                name: name,
                email: email,
                password_hash: hashedPassword,
            };
            
            // Use the plain object to create a dto
            const savedUser = await this.userService.create(newUser)

            return {
                message: 'Usuario registrado',
                email: newUser.email
            };
        } catch (error) {
            //console.log(error);
            throw new BadRequestException('Error registering new user');
        }
    }
}
