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
  @Input() isEditMode: boolean = false;
  @Input() isDeleteMode: boolean = false;

  @Output() saveDoctor = new EventEmitter<Doctor>();
  @Output() toggleEdit = new EventEmitter<void>();  // Define the Output EventEmitter
  @Output() toggleDelete = new EventEmitter<void>();

  


  toggleEditMode() {
    this.toggleEdit.emit();  // Emit the event to the parent to call the toggleEdit method
  }

  toggleDeleteMode(){
    this.toggleDelete.emit();
  }

  // isEditMode: boolean = false;
  // isDeleteMode: boolean=false;
  passwordChangeMode: boolean = false;
  newPassword: string = ''; 

  // toggleEditMode() {
  //   this.isEditMode = !this.isEditMode;
  // }


  // toggleDeleteMode(): void {
  //   this.isDeleteMode = !this.isDeleteMode; 
  // }

  togglePasswordChange() {
    this.passwordChangeMode = !this.passwordChangeMode;
  }

  saveChanges() {
    if (this.newPassword) {
      this.doctor.password = this.newPassword; 
    }
    this.saveDoctor.emit(this.doctor); 
    this.isEditMode = false;
    this.passwordChangeMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.passwordChangeMode = false;
    this.newPassword = '';
  }
  cancelDeleteMode(){
    this.isDeleteMode = false
  }
  

  generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
