import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  // mokled aq sheqmni cvlads romelic iqneba pasuxismgebeli autorizaciis
  // componentis chvenebaze magalitaad is open.

  isModalOpen:boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  // aq gaketdeba gadamrtveli anu tu false aris true xdeba da piriqit
  toggleModal() {
    this.isModalOpen = !this.isModalOpen
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  navigateToUserPage() {
    const role = this.authService.getUserData()?.role;
    if (role === 'User') {
      this.router.navigate(['/user-page']);
    } else if (role === 'Doctor') {
      this.router.navigate(['/doctor-page']);
    } else if (role === 'Admin') {
      this.router.navigate(['/administrator']);
    }
  }
}
