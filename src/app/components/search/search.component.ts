import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  nameSearch: string = '';
  categorySearch: string = '';
  isListVisible: boolean = false; 

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {

    this.doctorService.getDoctors().subscribe(
      (response) => {
        this.doctors = response;
        this.filteredDoctors = []; 
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  filterDoctors(): void {
    const nameSearchLower = this.nameSearch.trim().toLowerCase();
    const categorySearchLower = this.categorySearch.trim().toLowerCase();


    this.isListVisible = !!(this.nameSearch || this.categorySearch);

    this.filteredDoctors = this.doctors.filter((doctor) => {
      const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
      const category = doctor.category.toLowerCase();

      const nameMatch = nameSearchLower
        ? fullName.includes(nameSearchLower)
        : true;
      const categoryMatch = categorySearchLower
        ? category.includes(categorySearchLower)
        : true;

      return nameMatch && categoryMatch;
    });


    if (!this.nameSearch.trim() && !this.categorySearch.trim()) {
      this.isListVisible = false;
    }
  }

  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}


