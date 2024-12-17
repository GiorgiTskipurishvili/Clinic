import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() doctor: any;
  stars: number[] =[];


    generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
