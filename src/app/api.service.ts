import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/'; // URL del backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/login/`, { email, password });
  }

  registerPatient(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/register/patient/`, userData);
  }

  registerDoctor(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/register/doctor/`, userData);
  }

  getCurrentUser(): string {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return userId;
    } else {
      return "";
    }
  }

  setCurrentUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

  logout() {
    localStorage.removeItem('user');
  }

  getMedicalCenters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}medical-centers/`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${userId}/`);
  }

  getUsersByMedicalCenter(medical_center: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/by_medical_center/${medical_center}`);
  }
}
