import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent {
  @Input() doctor: any = {};
  stars: number[] =[];


  @Output() saveDoctor = new EventEmitter<Doctor>();

  editMode: boolean = false;
  passwordChangeMode: boolean = false;
  newPassword: string = ''; 

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  togglePasswordChange() {
    this.passwordChangeMode = !this.passwordChangeMode;
  }

  saveChanges() {
    if (this.newPassword) {
      this.doctor.password = this.newPassword; 
    }
    this.saveDoctor.emit(this.doctor); 
    this.editMode = false;
    this.passwordChangeMode = false;
  }

  cancelEdit() {
    this.editMode = false;
    this.passwordChangeMode = false;
    this.newPassword = '';
  }
  

  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
