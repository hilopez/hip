import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  codigoCentro: string = '';
  role: string = 'Paciente';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      codigoCentro: this.codigoCentro,
      role: this.role,
    };

    this.http.post('http://tu-api.com/register', user).subscribe(
      (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro', error);
        alert('Hubo un error en el registro');
      }
    );
  }
}
