import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'Paciente'; // Default role
  dateOfBirth: string = '';
  gender: string = '';
  centerCode: string = '';
  centers: string[] = ['Centro 1', 'Centro 2', 'Centro 3']; // Simulación de centros médicos

  constructor(private apiService: ApiService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const userData = {
      email: this.email,
      password: this.password,
      role: this.role,
      dateOfBirth: this.role === 'Paciente' ? this.dateOfBirth : null,
      gender: this.role === 'Paciente' ? this.gender : null,
      centerCode: this.role === 'Doctor' ? this.centerCode : null
    };

    this.apiService.register(userData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }
}
