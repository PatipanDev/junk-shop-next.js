import { NewUser,User } from "@/domain/entities/user"
import { AuthService } from "@/domain/interface/AuthService"

export async function registerUser(
    authService: AuthService,
    newUser: NewUser
): Promise<User>{
    return await authService.register(newUser)
}