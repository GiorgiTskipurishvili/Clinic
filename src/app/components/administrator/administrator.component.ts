// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { DoctorService } from '../../services/doctor.service';

// @Component({
//   selector: 'app-administrator',
//   templateUrl: './administrator.component.html',
//   styleUrl: './administrator.component.css'
// })
// export class AdministratorComponent {
//   doctor: any;

//   constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

//   ngOnInit(): void {
//     const doctorId = Number(this.route.snapshot.paramMap.get('doctorId'));
//     if (doctorId) {
//       this.doctorService.getDoctorById(doctorId).subscribe(
//         (data) => {
//           this.doctor = data; 
//         },
//         (error) => console.error('Error fetching doctor details:', error)
//       );
//     }
//   }
// }


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
  doctorId: number | null = null; // Change type to number
  doctor: any;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit(): void {
    // Convert doctorId to a number
    this.route.paramMap.subscribe(params => {
      const id = params.get('doctorId');
      this.doctorId = id ? +id : null; // Use + operator to convert string to number
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


    // // Handle saving the doctor data emitted from CardEditComponent
    // saveDoctor(updatedDoctor: any) {
    //   this.doctorService.updateDoctor(updatedDoctor.id, updatedDoctor).subscribe({
    //     next: () => {
    //       console.log('Doctor data saved successfully');
    //       this.doctor = { ...updatedDoctor }; // Update local doctor data
    //     },
    //     error: (err) => {
    //       console.error('Failed to save doctor data:', err);
    //       alert('Error saving doctor data. Please try again.');
    //     }
    //   });
    // }

    saveDoctor(updatedDoctor: Doctor): void {
      this.doctorService.updateDoctor(updatedDoctor.id, updatedDoctor).subscribe({
        next: () => {
          console.log('Doctor updated successfully');
          this.doctor = { ...updatedDoctor }; // Update local doctor data
        },
        error: (err) => {
          console.error('Failed to update doctor:', err);
          alert('Error saving doctor data. Please try again.');
        }
      });
    }
    
}
