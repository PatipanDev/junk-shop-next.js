import { RegisterFormData, RegisterRespone } from "@/types";


export async function registerUser(formData: RegisterFormData): Promise<RegisterRespone
>{
    try{
        const res = await fetch("/api/register", {
            method: "POST",
            headers:{
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        return data;
    }catch(error){
        return {success:false, error: "Unexpected error occurred."}
    }
}