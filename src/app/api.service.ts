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
    localStorage.removeItem('userId');
  }

  getMedicalCenters(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}medical-centers/`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${userId}/`);
  }

  getUsersByMedicalCenterPaginated(medical_center: string, page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/by_medical_center_paginated/${medical_center}/?page=${page}`);
  }

  getCountUsersByMedicalCenter(medical_center: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/count_by_medical_center/${medical_center}/`);
  }

  getUsersByMedicalCenterPaginatedSearch(medical_center: string, page: number, patientName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/by_medical_center_paginated_search/${medical_center}/?page=${page}&search_name=${patientName}`);
  }

  getCountUsersByMedicalCenterSearch(medical_center: string, patientName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/count_by_medical_center_search/${medical_center}/?search_name=${patientName}`);
  }

  getAllQuestionaires(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}questionnaires/`);
  }

  getQuestionairesUnDoneByPatientId(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users-questionnaires/user_undone/${patientId}/`);
  }

  getQuestionairesByMyPatient(): Observable<any> {
    let patientId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}users-questionnaires/user/${patientId}/`);
  }

  getPatientById(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/${patientId}/`);
  }

  getMyPatient(): Observable<any> {
    let patientId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}users/${patientId}/`);
  }

  getQuestionaireById(questionnaireId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}questionnaires/${questionnaireId}/`);
  }

  getQuestionsByQuestionnaireId(questionnaireId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}questions/questionnaire/${questionnaireId}/`);
  }

  createUserQuestionnaire(userQuestionnaireData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users-questionnaires/`, userQuestionnaireData);
  }

  getQuestionairesCountUnDoneByPatientId(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users-questionnaires/user_count_undone/${patientId}/`);
  }

  updateQuestionairesById(questionnaireId: number, questionnaireBody: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}users-questionnaires/${questionnaireId}/`, questionnaireBody);
  }

  getQuestionairesByPatientId(patientId: string, questionnaireId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users-questionnaires/user/${patientId}/questionnaire/${questionnaireId}`);
  }
}
