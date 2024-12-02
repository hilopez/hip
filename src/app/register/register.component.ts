import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'Paciente';
  birth_date: string = '';
  gender: string = '';
  centerCode: string = '';
  centers: {id: string, name: string, code: string}[] = [];

  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getMedicalCenters().subscribe(
      response => {
        this.centers = response;
      }
    );
  }

  register() {
    this.errorMessage = "";
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Contraseñas no coinciden';
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      rol: this.role,
      gender: this.role === 'Paciente' ? this.gender : null,
      birth_date: this.role === 'Paciente' ? this.birth_date : null,
      medical_center: this.centerCode
    };

    if (this.role === 'Paciente') {
      this.apiService.registerPatient(userData).subscribe(
        () => {
          this.router.navigate(['/login']).then();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      this.apiService.registerDoctor(userData).subscribe(
        () => {
          this.router.navigate(['/login']).then();
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    }
  }
}
