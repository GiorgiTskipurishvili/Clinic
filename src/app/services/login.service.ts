import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7291/api/Login';

  constructor(private http: HttpClient) { }

  authenticate(login: Login): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(this.apiUrl,login);
  }
}
