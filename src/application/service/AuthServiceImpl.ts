import { User, NewUser } from '../../domain/entities/user'
import { AuthService } from '../../domain/interface/AuthService'
import { AuthError } from '@/domain/errors/AuthError'
import { UserRepository } from '../../domain/interface/UserRepository';
import { comparePassword, hashPassword } from './HashService';


export class AuthServiceImpl implements AuthService {
    constructor(private userRepository: UserRepository) { }

    async register(newUser: NewUser): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(newUser.email);
        if (existingUser) {
            throw new AuthError('User with this email already exists.');
        }

        const hashedPassword = await hashPassword(newUser.password);

        const userToSave: NewUser = {
            email: newUser.email,
            password: hashedPassword,
            name: newUser.name
        }

        return this.userRepository.save(userToSave)
    }

    async login(email: string, password: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.password) {
            return false; // หรือ throw AuthError ก็ได้
        }

        const isMatch = await comparePassword(password, user.password)
        return isMatch
    }
}