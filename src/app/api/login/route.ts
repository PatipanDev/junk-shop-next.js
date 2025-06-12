import { Login } from "@/domain/entities/user";
import { NextRequest, NextResponse } from "next/server";
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository';
import { AuthServiceImpl } from "@/application/service/AuthServiceImpl";
import { LoginUeserDTO } from "@/dto/user";


export async function POST(request: NextRequest) {
    const body: LoginUeserDTO = await request.json();

    const userRepository = new PrismaUserRepository();
    const authService = new AuthServiceImpl(userRepository)
    try {
        const success = await authService.login(body.email, body.password)

        if (!success) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' })
    }
}