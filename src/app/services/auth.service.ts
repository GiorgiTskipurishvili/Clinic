import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { LoginService } from './login.service';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loginUrl = 'https://localhost:7291/api/Login';

  // constructor(private http:HttpClient) { }

  // login(LoginData: Login):Observable<Token>{
  //   return this.http.post<Token>(this.loginUrl, LoginData);
  // }

  private userDataKey = 'userData';

  constructor(private loginService: LoginService) {}
  
  login(loginData: Login): Promise<void> {
    return new Promise((resolve, reject) => {
      this.loginService.authenticate(loginData).subscribe({
        next: (response: TokenResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem(this.userDataKey, JSON.stringify({
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role
          }));
          resolve();
        },
        error: () => reject("Login failed")
      });
    });
  }

  getUserData() {
    const data = localStorage.getItem(this.userDataKey);
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem(this.userDataKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }


  
}
