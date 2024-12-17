import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-doctor-for-administration',
  templateUrl: './doctor-for-administration.component.html',
  styleUrl: './doctor-for-administration.component.css'
})
export class DoctorForAdministrationComponent  {
  @Input() doctors: any[] = [];
  stars: number[] =[];



  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
