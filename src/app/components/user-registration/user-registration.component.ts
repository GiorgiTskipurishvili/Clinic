import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailConfService } from '../../services/email-conf.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  activationCodeVerified = false; 
  errorMessage = '';
  buttonLabel = 'დაადასტურე კოდი'; 
  user: User = {firstName:'', lastName:'', email:'', password:'', personalId:0 , role:2};

  constructor(
    private fb: FormBuilder,
    private emailConfService: EmailConfService,
    private userService: UserService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      personalId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      activationCode: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  sendActivationCode() {
    const email = this.registrationForm.get('email')?.value;
    if (email) {
      this.emailConfService.sendVerificationCode(email).subscribe({
        next: () => {
          this.errorMessage = '';
          alert('აქტივაციის კოდი წარმატებით გაიგზაბვნმაა.!');
        },
        error: () => {
          this.errorMessage = 'აქტივაციის კოდის გაგზავნა ვერ მოხერხდა. სცადეთ ისევ!';
        },
      });
    }
  }

  handleButtonClick() {
    if (!this.activationCodeVerified) {
      this.verifyActivationCode();
    } else {
      this.registerUser();
    }
  }

  verifyActivationCode() {
    const email = this.registrationForm.get('email')?.value;
    const code = this.registrationForm.get('activationCode')?.value;

    if (email && code) {
      this.emailConfService.verifyCode(email, code).subscribe({
        next: (isValid) => {
          if (isValid) {
            this.activationCodeVerified = true;
            this.buttonLabel = 'რეგისტრაცია';
            this.errorMessage = '';
            alert('აქტივაციის კოდი გააქტიურებულია!');
          } else {
            this.errorMessage = 'აქტივაციის კოდი არასწორია ან გაუვიდა დრო, გთხოვთ გაგზავნეთ აქტივაციის კოდი ისევ.';
          }
        },
        error: () => {
          this.errorMessage = 'აქტივაციის კოდის გადამოწმება ვერ მოხერხდა. გთხოვთ ცადეთ ისევ...';
        },
      });
    }
  }


  registerUser() {
    if (!this.activationCodeVerified) {
      this.errorMessage = 'გთხოვთ, გადაამოწმოთ აქტივაციის კოდი!';
      return;
    }
  
 
    if(this.registrationForm.valid){
      this.user.firstName = this.registrationForm.value.firstName??'';
      this.user.lastName = this.registrationForm.value.lastName??'';
      this.user.email = this.registrationForm.value.email??'';
      this.user.password = this.registrationForm.value.password??'';
      this.user.personalId = this.registrationForm.value.personalId??0;
      this.user.role= this.registrationForm.value.role??2;
    }

    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password || this.user.personalId === 0) {
      this.errorMessage = 'ყველა ველის შესრულება სავალდებულოა!!!';
      return;
    }

    this.userService.addUser(this.user).subscribe({
      next:()=>{
        alert('თქვენ წარმაებით დარეგისტირდი!');
        this.router.navigate(['']);
      },
      error:(err) => {
        this.errorMessage = 'რეგისტრაცია წარუმატებელია: ${err.error}'
      }
    })


  }
  

  
}
