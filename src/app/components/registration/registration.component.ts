import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
 
  registrationForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      personalId: ['', [Validators.required]],
      category: ['', [Validators.required]],
      cv: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    this.registrationForm.get(controlName)?.setValue(file);
  }


  submit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
  

      Object.keys(this.registrationForm.controls).forEach((key) => {
        formData.append(key, this.registrationForm.get(key)?.value);
      });
  

      formData.append('role', '1');
  

      this.doctorService.addDoctor(formData).subscribe({
        next: () => {
          this.message = 'თქვენ წარმატებით დარეგისტირდით';
          setTimeout(() => this.router.navigate(['']), 2000);
        },
        error: (err) => {
          console.error('რეგისტრაცია ვერ მოხერხდა.', err);

          if (err.error instanceof ErrorEvent) {
            this.message = err.error.message;
          } else {
            this.message = err.error?.message || err.error || err.statusText || 'რეგისტრაცია ვერ მოხერხდა. სცადეთ ისევ...';
          }
        },
      });
    }
  }
  
  


  
}
