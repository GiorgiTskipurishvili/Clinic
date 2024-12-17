import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  doctors: any[] = [];

  visibleDoctorsCount: number = 6;
  showAll: boolean = false; 


  filteredDoctors: any[] = [];

  constructor(private doctorService: DoctorService){}

  ngOnInit(): void {
    this.getDoctors();
  }


  getDoctors() {
    this.doctorService.getDoctors().subscribe((data) => {
      this.doctors = data;
      this.filteredDoctors = data; 
    });
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.visibleDoctorsCount = this.showAll ? this.doctors.length : 6;
  }


  
  filterDoctorsByCategory(selectedCategory: string | null) {
    if (selectedCategory) {
      this.filteredDoctors = this.doctors.filter(doctor => doctor.category === selectedCategory);
    } else {
      this.filteredDoctors = [...this.doctors];
    }
    this.showAll = false;
    this.visibleDoctorsCount = 6;
  }



  onPinChange(updatedDoctor: any) {
    if (updatedDoctor.pinned) {
      this.filteredDoctors = [updatedDoctor, ...this.filteredDoctors.filter(doc => doc !== updatedDoctor)];
    } else {
      this.filteredDoctors = [...this.filteredDoctors.filter(doc => doc !== updatedDoctor), updatedDoctor];
    }
  }
  
}
