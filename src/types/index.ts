export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface RegisterRespone {
    success: boolean;
    error?: string;
}