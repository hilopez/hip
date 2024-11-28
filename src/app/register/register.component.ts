import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';
  birth_date: string = '';
  gender: string = '';
  centerCode: string = '';
  //centers: string[] = ['HOSPITAL EL ESCORIAL', 'HOSPITAL GENERAL DE VILLALBA', 'HOSPITAL GENERAL UNIVERSITARIO GREGORIO MARAÑON','HOSPITAL UNIVERSITARIO CLINICO SAN CARLOS','HOSPITAL UNIVERSITARIO DE FUENLABRADA','HOSPITAL UNIVERSITARIO DE GETAFE','HOSPITAL UNIVERSITARIO DE LA PRINCESA','HOSPITAL UNIVERSITARIO DE MOSTOLES','HOSPITAL UNIVERSITARIO DE TORREJON','HOSPITAL UNIVERSITARIO DEL HENARES','HOSPITAL UNIVERSITARIO DEL SURESTE','HOSPITAL UNIVERSITARIO DEL TAJO','HOSPITAL UNIVERSITARIO FUNDACION ALCORCON','HOSPITAL UNIVERSITARIO INFANTA CRISTINA','HOSPITAL UNIVERSITARIO INFANTA ELENA','HOSPITAL UNIVERSITARIO INFANTA LEONOR','HOSPITAL UNIVERSITARIO INFANTA SOFIA','HOSPITAL UNIVERSITARIO LA PAZ','HOSPITAL UNIVERSITARIO PRINCIPE DE ASTURIAS','HOSPITAL UNIVERSITARIO PUERTA DE HIERRO MAJADAHONDA','HOSPITAL UNIVERSITARIO RAMON Y CAJAL','HOSPITAL UNIVERSITARIO SANTA CRISTINA','HOSPITAL UNIVERSITARIO SEVERO OCHOA','HOSPITAL UNIVERSITARIO 12 DE OCTUBRE','IDCSALUD MOSTOLES SA	'];
  centers: {id: string, name: string, code: string}[] = [];

  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getMedicalCenters().subscribe(
      (response) => {
        this.centers = response;
      },
      (error) => {
        console.error('Error en el registro', error);
      }
    );
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const userData = {
      email: this.email,
      password: this.password,
      rol: this.role,
      birth_date: this.role === 'Paciente' ? this.birth_date : null,
      gender: this.role === 'Paciente' ? this.gender : null,
      medical_center: this.role === 'Doctor' ? this.centerCode : null
    };

    this.apiService.register(userData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Error al registrarse';
      }
    );
  }
}
