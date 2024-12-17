import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  userData: User | null =null;  
  bookings: Booking[] = [];
  

  constructor(private authService: AuthService, private userService:UserService, private bookingService: BookingService){}
  
  
  ngOnInit(): void {
    const userId = this.authService.getUserData()?.id;
    if(userId){
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.userData = data;
          // console.log("Fetched User Data:", this.userData);
        },
        (error) => console.error("Error fetching user data:", error)
      );

      
      this.bookingService.getByUserId(userId).subscribe(
        (data)=>{
          this.bookings = data;
        },
        (error)=> console.error('Error fetching bookings:', error)
      );
    }else{
      console.warn("No user ID found in auth service.");
    }

  }




}
