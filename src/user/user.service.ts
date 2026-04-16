import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findOneByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email });
    }

    async create(createDto: any) {
        const newUser = this.usersRepository.create(createDto);
        return await this.usersRepository.save(newUser);
    }
}
