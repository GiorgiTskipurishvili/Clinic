import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'https://localhost:7291/api/Doctors';

  constructor(private http:HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  addDoctor(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, doctor, { responseType: 'text' as 'json' });
  }
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  // PDF ფაილის ატვირთვა და ტექსტის ამოღება
  extractCvTextFromFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('pdfFile', file);

    return this.http.post<string>(`${this.baseUrl}/extractCvText`, formData);
  }
  
}
