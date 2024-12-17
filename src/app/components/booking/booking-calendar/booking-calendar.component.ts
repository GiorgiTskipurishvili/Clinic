import { Component, Input } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { BookingService } from '../../../services/booking.service';
import { formatDate } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrl: './booking-calendar.component.css'
})
export class BookingCalendarComponent {
  // @Input() doctorId!: number;
  bookings: Booking[] = []; 
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  startDayNumber: number = 1;
  isDeleteMode: boolean = false;
  isEditMode: boolean = false;
  isShowDescriptionTextForUpdate: boolean = false;

  selectedBooking: Booking | null = null; 
  newDescription: string = ''; 
  selectedBookingId: number | null = null;
  
  isOpenTextMode: boolean = false;


  doctorId!: number; 
  currentUserId: number | null = null;

  selectedDay: Date | null = null;
  selectedHour: string | null = null;
  bookingForm!: FormGroup;


  monthNames: string[] = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი',
    'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];
  weekDays: string[] = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];
  hours: string[] = [
    '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00',
    '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'
  ];

  constructor(private bookingService: BookingService, private authService:AuthService,private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.doctorId = +params['doctorId']; 
      this.fetchDoctorBookings(this.doctorId); 
    });

    this.currentUserId = this.authService.getUserData()?.id;

    this.bookingForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  
  // fetchDoctorBookings(doctorId: number): void {
  //   this.bookingService.getByDoctorId(doctorId).subscribe(
  //     (data) => {
  //       this.bookings = data; 
  //       console.log('Doctor bookings:', this.bookings);
  //     },
  //     (error) => {
  //       console.error('Error fetching doctor bookings:', error);
  //     }
  //   );
  // }

  

  fetchDoctorBookings(doctorId: number): void {
    this.bookingService.getByDoctorId(doctorId).subscribe(
      (data) => {
        this.bookings = data; 
        console.log('Doctor bookings:', this.bookings);
      },
      (error) => {
        if (error.status === 404) {
          this.bookings = [];
          console.log(`No bookings found for doctor ID ${doctorId}.`);
        } else {
          console.error('Error fetching doctor bookings:', error);
        }
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




  getWeekDay(day: number, month: number, year: number): number {
    if (month < 3) {
      month += 12;
      year -= 1;
    }
    const K = year % 100;
    const J = Math.floor(year / 100);
    const h = (day + Math.floor((13 * (month + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + (5 * J)) % 7;
    return (h + 5) % 7; 
  }



  toggleEditMode(): void{
    this.isEditMode = !this.isEditMode;
  }
  toggleDeleteMode(): void {
    this.isDeleteMode = !this.isDeleteMode; 
  }


  toggleOpenText(day: Date, hour: string): void {
    this.isOpenTextMode = true;
    this.selectedDay = day;
    this.selectedHour = hour;

    this.bookingForm.reset({
      description: '', 
    });
  }
  closeOpenText(): void {
    this.isOpenTextMode = false;
    this.selectedDay = null;
    this.selectedHour = null;

    this.bookingForm.reset();
  }


  isWeekday(dayName: string): boolean {
    return dayName !== 'შაბ' && dayName !== 'კვი';
  }

  cancelDeleteMode(){
    this.isDeleteMode = false
  }
  cancelEditMode(): void {
    this.isEditMode = false; 
    this.isShowDescriptionTextForUpdate = false; 
  }

  
  getBackgroundColor(day: string, hour: string, date: Date): string {
    if (day === 'შაბ' || day === 'კვი') {
      return 'rgb(248, 248, 235)';
    }
  

    if (isNaN(date.getTime())) return '#ffffff';
  

    const booking = this.bookings.find((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
      const formattedCalendarDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;
  
      return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
    });
  
    // return booking ? '#DAFAEE' : '#ffffff'; 
    if (booking) {
      if (booking.userId === this.currentUserId) return '#DAFAEE'; 
      return '#FFCCCC'; 
    }
    return '#ffffff';
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
  
    // return booking?.userId===this.currentUserId ? "ჩემი ჯავშანი" : null;

    if (booking) {
      if (booking.userId === this.currentUserId) return 'ჩემი ჯავშანი';
      return ' ';
    }
    return '+ დაჯავშნა';
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
  

      this.isDeleteMode = false;
  
      this.bookingService.deleteBooking(booking.id).subscribe(
        () => {
          console.log('დაჯავშნილი ადგილი წაიშალა');
        },
        (error) => {
          console.error('Error deleting booking:', error);
          this.bookings.push(booking);
        }
      );
    }
  }


  toggleDescriptionTextForUpdate(day: string, hour: string, date: Date): void {
    const booking = this.bookings.find((b) => {
      const bookingDate = new Date(b.bookingTime);
      const formattedBookingDate = formatDate(bookingDate, 'yyyy-MM-dd', 'en-US');
      const formattedCalendarDate = formatDate(date, 'yyyy-MM-dd', 'en-US');
      const bookingHour = `${bookingDate.getHours()}:00 - ${bookingDate.getHours() + 1}:00`;
  
      return formattedBookingDate === formattedCalendarDate && bookingHour === hour;
    });
  
    if (booking) {
      this.selectedBooking = booking;
      this.newDescription = booking.description;
      this.isShowDescriptionTextForUpdate = true; 
    } else {
      console.warn('Booking not found for the provided date and time.');
    }
  }



  updateDescription(): void {
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
      console.warn('No changes made to the description or no booking selected.');
    }
  }
  

  addNewBooking(): void {
    if (this.bookingForm.valid && this.selectedDay && this.selectedHour) {
      const startHour = this.selectedHour.split(' - ')[0].padStart(5, '0'); 
      const bookingData = {
        userId: this.currentUserId,
        doctorId: this.doctorId,
        description: this.bookingForm.get('description')?.value,
        bookingTime: formatDate(this.selectedDay, 'yyyy-MM-dd', 'en-US') + `T${startHour}:00`,
      };
  
      console.log('Booking Data:', bookingData);
  
      this.bookingService.addBooking(bookingData).subscribe(
        (response) => {
          alert('Booking added successfully.');
          this.fetchDoctorBookings(this.doctorId); 
          this.closeOpenText(); 
        },
        (error) => {
          console.error('Error adding booking:', error);
          alert('Error adding booking. Please try again.');
        }
      );
    } else {
      alert('Please fill in the required fields.');
    }
  }
  





}
