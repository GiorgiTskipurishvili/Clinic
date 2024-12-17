export interface Doctor {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalId: number;
    category: string;
    role: number;
    rating: number;
    photo?: Blob; 
    cv?: Blob; 
}
