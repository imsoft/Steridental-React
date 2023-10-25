export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    password: string;

    createdAt?: Date;
    updatedAt?: Date;
}
