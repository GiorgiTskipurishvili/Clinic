import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css']
})
export class DoctorPageComponent implements OnInit {

  stars: number[] = [];
  bookings: Booking[]=[];
  @Input() doctor:any;

  editMode: boolean = false;

  editablePersonalId: string = '';
  editableEmail: string = '';
  editablePassword: string = '';

  constructor(private authService: AuthService, private doctorService: DoctorService, private bookingService: BookingService) {}

  ngOnInit() {
    const doctorId = this.authService.getUserData()?.id;
    if (doctorId) {
      this.doctorService.getDoctorById(doctorId).subscribe(
        (data) => {
          this.doctor = data;
          this.stars = Array(this.doctor.rating).fill(0); 
        },
        (error) => console.error("Error fetching doctor data:", error)
      );

      this.bookingService.getByDoctorId(doctorId).subscribe(
        (data)=>{
          this.bookings=data;
        },
        (error)=> console.error('Error fetching bookings:', error)
      );

    } else {
      console.warn("NOt user ID found in auth service.");
    }


  }

}
