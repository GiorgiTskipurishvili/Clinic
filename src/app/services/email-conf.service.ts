import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailConfService {
  private baseUrl = 'https://localhost:7291/api/EmailConf';

  constructor(private http: HttpClient) {}

  sendVerificationCode(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/send-verification`, null, {
      params: { email },
    });
  }

verifyCode(email: string, code: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.baseUrl}/verify-code`, null, {
    params: { email, code },
  });
}

}
