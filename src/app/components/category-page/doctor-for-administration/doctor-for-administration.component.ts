import { Component, EventEmitter, Input, Output} from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor-for-administration',
  templateUrl: './doctor-for-administration.component.html',
  styleUrl: './doctor-for-administration.component.css'
})
export class DoctorForAdministrationComponent  {
  @Input() doctors: any[] = [];
  stars: number[] =[];
  // @Output() delete = new EventEmitter<void>(); 

  constructor(private doctorService: DoctorService) {}

  onDelete(){
    // this.delete.emit();
    alert('მომხმარებელი წაიშალა')
  }

  deleteDoctor(doctorId: number): void {
    if (confirm('დარწმუნებული ხართ, რომ გსურთ ამ ექიმის წაშლა?')) {
      this.doctorService.deleteDoctor(doctorId).subscribe({
        next: () => {
          alert('ექიმი წარმატებით წაიშალა.');
          // წაშლის შემდეგ სიის განახლება
          this.doctors = this.doctors.filter(doctor => doctor.id !== doctorId);
        },
        error: (err) => {
          console.error('წაშლის შეცდომა:', err);
          alert('ექიმის წაშლა ვერ მოხერხდა. სცადეთ კიდევ.');
        }
      });
    }
  }

generateStars(rating: number): number[] {
  return Array(Math.round(rating)).fill(0);
}
}
