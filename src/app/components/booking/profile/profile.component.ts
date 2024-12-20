import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';

interface Experience {
  year: string;
  description: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  @Input() doctorId!: number; // Receive doctorId from parent
  // doctor: any;
  @Input() doctor: any;
  experiences: Experience[] = [];
  isLoadingCv: boolean = false;
  cvError: string | null = null;
  constructor(
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.doctorId = +params['doctorId']; 
      this.loadDoctorDetails(this.doctorId); 
    });
  }

  
    generateStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

  
  // Load doctor details by ID
  loadDoctorDetails(id: number): void {
    this.doctorService.getDoctorById(id).subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        this.loadCvExperience();
      },
      error: (err) => {
        console.error('Error fetching doctor details:', err);
        this.cvError = 'Failed to load doctor details';
      },
    });
  }

    // Extract CV text and parse experiences
    loadCvExperience() {
      if (!this.doctorId) {
        this.cvError = 'Doctor ID is missing';
        return;
      }
  
      this.isLoadingCv = true;
      this.cvError = null;
      this.experiences = [];
  
      this.doctorService.extractCvText(this.doctorId).subscribe({
        next: (response) => {
          try {
            this.parseExperienceFromCv(response.extractedText);
          } catch (error) {
            console.error('Error parsing CV text:', error);
            this.cvError = 'Error parsing experience details';
          }
        },
        error: (err) => {
          console.error('Error loading CV:', err);
          this.cvError = 'Failed to load CV text';
        },
        complete: () => {
          this.isLoadingCv = false;
        },
      });
    }
  

  private parseExperienceFromCv(cvText: string) {
    const experiences: Experience[] = [];

    const lines = cvText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const experiencePattern =
      /(\d{4})\s*[-–]\s*(დღემდე|\d{4}),\s*(.+?)(?=\s*\d{4}\s*[-–]|$)/g;

    for (const line of lines) {
      let match;
      while ((match = experiencePattern.exec(line)) !== null) {
        const [_, startYear, endYear, description] = match;
        experiences.push({
          year: `${startYear} - ${endYear}`,
          description: description.trim(),
        });
      }
    }

    this.experiences = experiences.sort((a, b) => {
      const yearA = parseInt(a.year.split('-')[0]);
      const yearB = parseInt(b.year.split('-')[0]);
      return yearB - yearA;
    });

    if (experiences.length === 0) {
      this.cvError = 'No experience entries found in CV';
    }
  }

}
