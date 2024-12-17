import { Component, OnInit} from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit{

  doctors: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }


  getDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
        console.log('Doctors loaded:', this.doctors);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
}
