// types/application.ts
export interface Application {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    message: string;
    phone?: string;
    portfolio?: string;
    fileUrl: string;
}