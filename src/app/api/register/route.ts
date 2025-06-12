import { AuthServiceImpl } from "@/application/service/AuthServiceImpl";
import { registerUser } from "@/application/use-cases/registerUser";
import { PrismaUserRepository } from "@/infrastructure/repositories/PrismaUserRepository";
import { NewUser } from '@/domain/entities/user';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const userRepository = new PrismaUserRepository();
    const authService = new AuthServiceImpl(userRepository);

    try {
        const newUser: NewUser = {
            email: body.email,
            password: body.password,
            name: body.name
        };

        const user = await registerUser(authService, newUser);

        // ตัด password ออกก่อนส่งกลับ
        const { password, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
