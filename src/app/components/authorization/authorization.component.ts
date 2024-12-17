import { Component, EventEmitter, Output } from '@angular/core';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
  @Output() toggle = new EventEmitter<void>();
  loginData: Login = { email: '', password: '' };
  loginError: string | null = null;
  
  constructor(private authService: AuthService) { }


  async login() {
    try {
      await this.authService.login(this.loginData);
      this.toggle.emit(); 
    } catch (error) {
      this.loginError = "Invalid email or password.";
    }
  }

  close() {
    this.toggle.emit();
  }
}
