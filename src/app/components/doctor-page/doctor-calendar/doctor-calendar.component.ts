import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { AuthService } from '../../../services/auth.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-calendar',
  templateUrl: './doctor-calendar.component.html',
  styleUrl: './doctor-calendar.component.css'
})
export class DoctorCalendarComponent implements OnInit {
  bookings: Booking[] = []; 
  currentYear: number = 2024;
  currentMonth: number = 11;
  startDayNumber: number = 1;
  isDeleteMode: boolean=false;
  isEditMode: boolean = false;

  isShowDescriptionTextForUpdate: boolean = false;
  selectedBooking: Booking | null = null; 
  newDescription: string = ''; 
  selectedBookingId: number | null = null;

  monthNames: string[] = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი',
    'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  weekDays: string[] = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];
  hours: string[] = [
    '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const doctorId = this.authService.getUserData()?.id; 
    if (doctorId) {
      this.fetchDoctorBookings(doctorId);
    }
  }

  fetchDoctorBookings(doctorId: number): void {
    this.bookingService.getByDoctorId(doctorId).subscribe(
      (data) => {
        this.bookings = data; 
        console.log('Doctor bookings:', this.bookings);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate(); 
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }


  changeMonth(increment: number): void {
    this.currentMonth += increment;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    }
    this.startDayNumber = 1; 
  }


  getCurrentWeekDays(): { name: string; date: Date }[] {
    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const adjustedFirstDay = (firstDayOfMonth + 6) % 7; // Monday as 0
    
    return Array.from({ length: 7 }, (_, index) => {
      const dayNumber = this.startDayNumber - adjustedFirstDay + index;
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        // Current month
        return { name: this.weekDays[index], date: new Date(this.currentYear, this.currentMonth, dayNumber) };
      } else if (dayNumber <= 0) {
        // Previous month
        const previousMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
        const previousYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
        const previousMonthDays = this.getDaysInMonth(previousYear, previousMonth);
        return { name: this.weekDays[index], date: new Date(previousYear, previousMonth, previousMonthDays + dayNumber) };
      } else {
        // Next month
        const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
        const nextYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
        return { name: this.weekDays[index], date: new Date(nextYear, nextMonth, dayNumber - daysInMonth) };
      }
    });
  }




  nextWeek(): void {
    this.startDayNumber += 7;
    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    if (this.startDayNumber > daysInMonth) {
      this.startDayNumber -= daysInMonth;
      this.changeMonth(1);
    }
  }



  previousWeek(): void {
    this.startDayNumber -= 7;
    if (this.startDayNumber < 1) {
      this.changeMonth(-1);
      this.startDayNumber += this.getDaysInMonth(this.currentYear, this.currentMonth);
    }
  }



  getBookingText(day: string, hour: string, date: Date): string | null {
    if (day === 'შაბ' || day === 'კვი' || isNaN(date.getTime())) return null; 
  
    const booking = this.bookings.find((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
      const formattedCalendarDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;
  
      return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
    });
  
    return booking ? "დაჯავშნილია" : null;
  }

  getBackgroundColor(day: string, hour: string, date: Date): string {
    if (day === 'შაბ' || day === 'კვი') {
      return '#FFFFF5'; 
    }

    if (isNaN(date.getTime())) return '#ffffff';
  

    const isBooked = this.bookings.some((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
      const formattedCalendarDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;
  
      return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
    });
  
    return isBooked ? '#DAFAEE'  : '#ffffff';
  }



isWeekDay(dayName:string): boolean{
  return dayName !=='შაბ' && dayName !=='კვი';
}

toggleDeleteMode(): void {
  this.isDeleteMode = !this.isDeleteMode;
}

toggleEditMode(): void{
  this.isEditMode = !this.isEditMode;
}

cancelDeleteMode(){
  this.isDeleteMode=false;
}



deleteBooking(dayInfo: { name: string; date: Date }, hour: string): void {
  const booking = this.bookings.find((booking) => {
    const bookingDate = new Date(booking.bookingTime);
    const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
    const formattedCalendarDate = formatDate(dayInfo.date, 'yyyy-MM-dd', 'en-US');
    const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;

    return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
  });

  if (booking) {
    const bookingIndex = this.bookings.indexOf(booking);
    if (bookingIndex !== -1) {
      this.bookings.splice(bookingIndex, 1);
    }

    this.bookingService.deleteBooking(booking.id).subscribe(
      () => {
        alert('თქვენ წარმატებით წაშალეთ დაჯავშნილი ადგილი'); 
      },
      (error) => {
        console.error('Error deleting booking:', error);
        if (bookingIndex !== -1) {
          this.bookings.splice(bookingIndex, 0, booking);
        }
      }
    );
  }
}




toggleDescriptionTextForUpdate(day: string, hour: string, date: Date):void{
  const booking = this.bookings.find((b) => {
    const bookingDate = new Date(b.bookingTime);
    const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
    const formattedCalendarDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;

    return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
  });

  if(booking){
    this.selectedBooking = booking;
    this.newDescription = booking.description;
    this.isShowDescriptionTextForUpdate=true;
  }else{
    console.warn('booking not found for the provided date and time.');
  }
}

cancelEditMode():void{
  this.isEditMode=false;
  this.isShowDescriptionTextForUpdate = false;
}



saveDescription(): void {
  if (this.selectedBooking && this.newDescription !== this.selectedBooking.description) {
    const updatedBooking: Booking = {
      ...this.selectedBooking, 
      description: this.newDescription, 
    };

    this.bookingService.updateBooking(updatedBooking.id, updatedBooking).subscribe(
      () => {
        alert('თქვენ წარმატებით გაანახლეთ აღწერა');
        if (this.selectedBooking) { 
          this.selectedBooking.description = this.newDescription; 
        }
        this.isShowDescriptionTextForUpdate = false; 
        this.selectedBooking = null; 
      },
      (error) => {
        console.error('Error updating booking description:', error);
      }
    );
  } else {
    console.warn('no changes made to the description or no booking selected.');
  }
}




}
