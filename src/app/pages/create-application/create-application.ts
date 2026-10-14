import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-create-application',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-application.html',
  styleUrl: './create-application.css',
})
export class CreateApplication {
  private apiService = inject(ApiService);
  private router = inject(Router);

  application = {
    applicantName: '',
    insuranceType: '',
    coverageAmount: null as number | null
  };

  createApplication(): void {

    console.log('Applicant name:', this.application.applicantName);
    console.log('Insurance type:', this.application.insuranceType);
    console.log('Coverage amount:', this.application.coverageAmount);

    if (
      !this.application.applicantName.trim() ||
      !this.application.insuranceType ||
      this.application.coverageAmount === null ||
      this.application.coverageAmount <= 0
    ) {
      return;
    }

    console.log("hello");
    
    console.log(this.application);
    

    this.apiService.createApplication({
      applicantName: this.application.applicantName.trim(),
      insuranceType: this.application.insuranceType,
      coverageAmount: this.application.coverageAmount
    }).subscribe({
      next: () => {
        this.router.navigate(['/applications']);
      },
      error: (error) => {
        console.error('Error creating application:', error);
      }
    });
  }
}