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

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users/`, userData);
  }

  getCurrentUser() {
    // Recupera el usuario de localStorage o sessionStorage
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('user');
  }

  getMedicalCenters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}medical-centers/`);
  }

  getUsersByMedicalCenter(medical_center: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/by_medical_center/${medical_center}`);
  }
}
