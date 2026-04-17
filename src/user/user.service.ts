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

    async findOneByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password_hash: true,
            },
        });
    }

    async create(createDto: any) {
        const newUser = this.usersRepository.create(createDto);
        return await this.usersRepository.save(newUser);
    }
}
