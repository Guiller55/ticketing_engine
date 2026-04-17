import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
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
                message: 'User registered',
                email: newUser.email
            };
        } catch (error) {
            //console.log(error);
            throw new BadRequestException('Error registering new user');
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        //Find in database a tuple with that email
        const user = await this.userService.findOneByEmail(email);
        
        //user null will be false, too compares using bcrypt
        if (user && await bcrypt.compare(password, user.password_hash)){
            //store all except the hash in result
            const { password_hash, ...result } = user;
            return result;
        }

        // If not match then return null
        return null;
    }

    //Generate a jwt using a user
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
