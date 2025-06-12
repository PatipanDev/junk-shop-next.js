import {User, NewUser} from '../entities/user'

export interface UserRepository{
    findByEmail(email:string):Promise<User|null>;
    save(newUser: NewUser): Promise<User>;
}