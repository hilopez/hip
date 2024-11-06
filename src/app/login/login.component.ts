import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string =  '';
  password: string =  '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://138.4.10.37:8081/api/login/', { email: this.email, password: this.password })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.access);
          this.router.navigate(['/dashboard']);  // Ajusta la ruta según tu aplicación
        },
        error => {
          this.password = '';
          alert('Usuario o contraseña incorrectos.');
          console.error('Login error', error);
        }
      );
  }
}
