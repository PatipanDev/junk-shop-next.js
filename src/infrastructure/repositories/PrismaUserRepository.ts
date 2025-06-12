import {User, NewUser} from '../../domain/entities/user'
import { UserRepository } from '@/domain/interface/UserRepository'
import prisma from '../../../prisma/client'


export class PrismaUserRepository implements UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) return null;
        return user;
    }

    async save(newUser: NewUser): Promise<User>{
        const createdUser = await prisma.user.create({
            data: newUser,
        })
        return createdUser
    }

    
}