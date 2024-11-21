import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://138.4.10.37:8081/api'; // URL base

  constructor(private http: HttpClient) {}

  // Método para obtener cuestionarios
  obtenerCuestionarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cuestionarios`);
  }

  // Método para obtener resultados
  obtenerResultados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resultados`);
  }

  // Método para obtener pacientes del centro
  obtenerPacientesDeCentro(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pacientes`);
  }

  // Método para iniciar sesión
  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password, role });
  }

  // Método para almacenar el token en el localStorage
  storeToken(token: string, role: string): void {
    localStorage.setItem('token', token); // Almacena el token
    localStorage.setItem('role', role);   // Almacena el rol
  }

  // Verificar si el usuario está autenticado (basado en la existencia del token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtener el rol del usuario desde el localStorage
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}


