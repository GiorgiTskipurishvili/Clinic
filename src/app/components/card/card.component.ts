import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() doctor: any;
  stars: number[] =[];

  @Output() pinChange = new EventEmitter<any>();

  togglePin() {
    this.doctor.pinned = !this.doctor.pinned;
    this.pinChange.emit(this.doctor);
  }

  

  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
