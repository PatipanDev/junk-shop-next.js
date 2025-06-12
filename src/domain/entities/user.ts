export interface User {
    id:string;
    email: string;
    password: string;
    name: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewUser {
    email: string;
    password: string;
    name?: string | null;
}

export interface Login{
    email: string
    password: string
}