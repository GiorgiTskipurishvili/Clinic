export interface TokenResponse {
    id: number;
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'User' | 'Doctor' | 'Admin';

  }
  