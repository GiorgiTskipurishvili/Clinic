import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'https://localhost:7291/api/Bookings';

  constructor(private http:HttpClient) { }

  getBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBookingById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  addBooking(booking: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, booking, { responseType: 'text' as 'json' });
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByUserId(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/user/${userId}`);
  }
  
  getByDoctorId(doctorId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }
  
}
