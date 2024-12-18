import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  doctorId: number | null = null;
  doctor: any;

  isEditMode: boolean = false;
  isDeleteMode:boolean = false;

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  toggleDelete(){
    this.isDeleteMode = !this.isDeleteMode;
  }

  

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('doctorId');
      this.doctorId = id ? +id : null; 
      if (this.doctorId !== null) {
        this.loadDoctorDetails(this.doctorId);
      }
    });
  }

  loadDoctorDetails(doctorId: number): void {
    this.doctorService.getDoctorById(doctorId).subscribe(
      (data) => {
        this.doctor = data;
      },
      (error) => {
        console.error('Failed to load doctor details:', error);
      }
    );
  }

    saveDoctor(updatedDoctor: Doctor): void {
      this.doctorService.updateDoctor(updatedDoctor.id, updatedDoctor).subscribe({
        next: () => {
          console.log('Doctor updated successfully');
          this.doctor = { ...updatedDoctor }; 
        },
        error: (err) => {
          console.error('Failed to update doctor:', err);
          alert('Error saving doctor data. Please try again.');
        }
      });
    }
    
}
