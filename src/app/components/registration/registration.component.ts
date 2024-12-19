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

  validPhotoTypes = ['image/jpeg', 'image/png'];
  validCVType = 'application/pdf';

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      personalId: ['', [Validators.required,  Validators.pattern(/^\d{11}$/)]],
      category: ['', [Validators.required]],
      cv: [null, [Validators.required]],
      photo: [null, [Validators.required]],
    });
  }


  categories = [
    { name: 'ანდროლოგი' },
    { name: 'ანესთეზიოლოგი'},
    { name: 'კარდიოლოგი'},
    { name: 'კოსმეტოლოგი'},
    { name: 'ლაბორანტი' },
    { name: 'ოჯახის ექიმი'},
    { name: 'პედიატრი' },
    { name: 'ტოქსიკოლოგი' },
    { name: 'ტრანსფუზილოგი'},
    { name: 'გინეკოლოგი'},
    { name: 'დერმატოლოგი'},
    { name: 'ენდოკრინოლოგი'},
    { name: 'გასტროენტეროლოგი'},
    { name: 'ალერგოლოგი'},
    { name: 'იმუნოლოგი'},
    { name: 'ფსიქიატრი'},
    { name: 'ორთოპედი'},
    { name: 'ნევროლოგი'},
    { name: 'ნეიროქირურგი'},
  ];


  // onFileChange(event: any, controlName: string) {
  //   const file = event.target.files[0];
  //   this.registrationForm.get(controlName)?.setValue(file);
  // }



  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    const control = this.registrationForm.get(controlName);

    if (file) {
      if (controlName === 'photo') {
        if (this.validPhotoTypes.includes(file.type)) {
          control?.setValue(file);
          control?.setErrors(null); 
        } else {
          control?.setErrors({ invalidFileType: true });
          // console.error("Invalid photo file type detected.");
        }
      } else if (controlName === 'cv') {
        if (file.type === this.validCVType) {
          control?.setValue(file);
          control?.setErrors(null); 
        } else {
          control?.setErrors({ invalidFileType: true });
          // console.error("Invalid CV file type detected.");
        }
      }
      control?.markAsTouched(); 
    }
  }

  
  // submit() {
  //   if (this.registrationForm.valid) {
  //     const formData = new FormData();
  

  //     Object.keys(this.registrationForm.controls).forEach((key) => {
  //       formData.append(key, this.registrationForm.get(key)?.value);
  //     });
  

  //     formData.append('role', '1');
  

  //     this.doctorService.addDoctor(formData).subscribe({
  //       next: () => {
  //         this.message = 'თქვენ წარმატებით დარეგისტირდით';
  //         setTimeout(() => this.router.navigate(['']), 2000);
  //       },
  //       error: (err) => {
  //         console.error('რეგისტრაცია ვერ მოხერხდა.', err);

  //         if (err.error instanceof ErrorEvent) {
  //           this.message = err.error.message;
  //         } else {
  //           this.message = err.error?.message || err.error || err.statusText || 'რეგისტრაცია ვერ მოხერხდა. სცადეთ ისევ...';
  //         }
  //       },
  //     });
  //   }
  // }
  
  submit() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      Object.keys(this.registrationForm.controls).forEach((key) => {
        formData.append(key, this.registrationForm.get(key)?.value);
      });
      formData.append('role', '1');
  
      this.doctorService.addDoctor(formData).subscribe({
        next: () => {
          alert('თქვენ წარმატებით დარეგისტირდით');
          this.router.navigate(['']); // or any other redirection logic
        },
        error: (err) => {
          console.error('Error:', err);
          alert('სამწუხაროდ, თქვენ ვერ დარეგისტირდით');
        },
      });
    }
  }
  
  


  
}
