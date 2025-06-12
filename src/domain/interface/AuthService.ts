import {User, NewUser} from '../entities/user'

export interface AuthService {
    register(newUser: NewUser): Promise<User>;
    login(email: string, password: string): Promise<boolean>;
}

