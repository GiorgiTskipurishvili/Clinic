import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {path:'', component:MainPageComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'user-registration', component:UserRegistrationComponent},
  {path:'category-page', component:CategoryPageComponent},
  {path:'user-page', component:UserPageComponent},
  {path:'doctor-page', component:DoctorPageComponent},
  {path:'administrator', component:AdministratorComponent},
  {path: 'booking/:doctorId', component: BookingComponent },
  { path: 'administrator/:doctorId', component: AdministratorComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
