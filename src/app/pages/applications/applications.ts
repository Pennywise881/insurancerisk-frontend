import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CurrencyPipe, RouterLink, FormsModule],
  selector: 'app-applications',
  styleUrl: './applications.css',
  templateUrl: './applications.html',
})
export class Applications implements OnInit {

  private apiService = inject(ApiService);
  private router = inject(Router);

  applications = signal<any[]>([]);
  searchTerm = ""
  selectedStatus = 'ALL'

  ngOnInit(): void {
    this.apiService.getApplications().subscribe({
      next: (data) => {
        this.applications.set(data);
        console.log('Applications received:', data);
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      }
    });
  }

  viewAssessment(id: number): void {
    this.router.navigate(['/assessments'], {
      state: { applicationId: id }
    });
  }

  get filteredApplications() {
    const term = this.searchTerm.trim().toLowerCase();

    return this.applications().filter((application) => {
      const matchesName = application.applicantName
        .toLowerCase()
        .includes(term);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        application.status === this.selectedStatus;

      return matchesName && matchesStatus;
    });
  }

}
