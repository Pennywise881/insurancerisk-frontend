import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { CurrencyPipe, DatePipe} from '@angular/common';
// import { JsonPipe } from '@angular/common';


@Component({
  imports: [CurrencyPipe, /*JsonPipe,*/ DatePipe],
  selector: 'app-assessments',
  styleUrl: './assessments.css',
  templateUrl: './assessments.html',
})
export class Assessments {
  private apiService = inject(ApiService);

  assessment= signal<any>(null);

  constructor() {
    const navigationId = history.state?.applicationId;
    const savedId = localStorage.getItem('lastApplicationId');

    // If an application was selected using the View button
    if (navigationId) {
      localStorage.setItem('lastApplicationId', String(navigationId));
      this.loadAssessment(Number(navigationId));
      return;
    }

    // Otherwise, use the last selected application
    if (savedId) {
      this.loadAssessment(Number(savedId));
      return;
    }

    // If no application was previously selected, use the first one
    this.apiService.getApplications().subscribe({
      next: (applications) => {
        if (applications.length > 0) {
          const firstApplicationId = applications[0].id;

          localStorage.setItem(
            'lastApplicationId',
            String(firstApplicationId)
          );

          this.loadAssessment(firstApplicationId);
        }
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      }
    });
  }

  loadAssessment(applicationId: number): void {
    this.apiService.getAssessmentById(applicationId).subscribe({
      next: (data) => {
        this.assessment.set(data);
      },
      error: (error) => {
        console.error('Error fetching assessment:', error);
      }
    });
  }

  latestAssessment() {
    const assessments = this.assessment()?.assessments ?? [];

    if (assessments.length === 0) {
      return null;
    }

    return assessments.reduce((latest: any, current: any) =>
      new Date(current.assessedAt).getTime() >
      new Date(latest.assessedAt).getTime()
        ? current
        : latest
    );
  }

  
  requestNewAssessment(): void {
    const applicationId = this.assessment()?.application?.id;
    console.log(applicationId);
    

    if (!applicationId) {
      return;
    }

    this.apiService.createAssessment(applicationId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error creating assessment:', error);
      }
    });
  }


}
