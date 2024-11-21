import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  codigoCentro: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
      codigoCentro: this.codigoCentro,
    };

    this.http.post('http://tu-api.com/login', loginData).subscribe(
      (response: any) => {
        // Guardar token y rol en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('codigoCentro', this.codigoCentro);

        // Redirigir a dashboard según el rol
        if (response.role === 'Paciente') {
          this.router.navigate(['/dashboard-paciente']);
        } else if (response.role === 'Doctor') {
          this.router.navigate(['/dashboard-doctor']);
        }
      },
      (error) => {
        alert('Usuario o contraseña incorrectos.');
        console.error('Login error', error);
      }
    );
  }
}
