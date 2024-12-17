import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryComponent } from './components/category/category.component';
import { CardComponent } from './components/card/card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { MenuComponent } from './components/administrator/menu/menu.component';
import { TabsComponent } from './components/administrator/tabs/tabs.component';
import { DoctorEditComponent } from './components/administrator/doctor-edit/doctor-edit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BookingComponent } from './components/booking/booking.component';
import { ProfileComponent } from './components/booking/profile/profile.component';
import { BookingCalendarComponent } from './components/booking/booking-calendar/booking-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardEditComponent } from './components/administrator/card-edit/card-edit.component';
import { DoctorForAdministrationComponent } from './components/category-page/doctor-for-administration/doctor-for-administration.component';
import { UserCalendarComponent } from './components/user-page/user-calendar/user-calendar.component';
import { DoctorCalendarComponent } from './components/doctor-page/doctor-calendar/doctor-calendar.component';
import { AdministratorCalendarComponent } from './components/administrator/administrator-calendar/administrator-calendar.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    MainPageComponent,
    CategoryComponent,
    CardComponent,
    RegistrationComponent,
    UserRegistrationComponent,
    AuthorizationComponent,
    CategoryPageComponent,
    UserPageComponent,
    DoctorPageComponent,
    AdministratorComponent,
    MenuComponent,
    TabsComponent,
    DoctorEditComponent,
    CalendarComponent,
    BookingComponent,
    ProfileComponent,
    BookingCalendarComponent,
    CardEditComponent,
    DoctorForAdministrationComponent,
    UserCalendarComponent,
    DoctorCalendarComponent,
    AdministratorCalendarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
