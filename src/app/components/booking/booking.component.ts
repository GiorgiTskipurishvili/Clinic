import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  doctor: any;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const doctorId = Number(params.get('doctorId'));
      if (doctorId) {
        this.fetchDoctor(doctorId);
      }
    });
  }

  fetchDoctor(doctorId: number): void {
    this.doctorService.getDoctorById(doctorId).subscribe(
      (data) => {
        this.doctor = data;
      },
      (error) => console.error('Error fetching doctor details:', error)
    );
  }
}
