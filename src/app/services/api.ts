import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api';

    getApplications(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/applications`);
    }

    getAssessmentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/assessments/${id}`);
    }

    createAssessment(applicationId: number) {
        // console.log(applicationId);
        
        return this.http.post(`${this.apiUrl}/assessments`, {
            applicationId: applicationId
        });
    }

    createApplication(application: {
    applicantName: string;
    insuranceType: string;
    coverageAmount: number;
    }) {
        return this.http.post(
            `${this.apiUrl}/applications`,
            application
        );
    }
}
