import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        this.apiService.setCurrentUser(response);  // Guarda el usuario en el localStorage
        /*if (response.role === 'Paciente') {
          this.router.navigate(['/dashboard-paciente']);
        } else if (response.role === 'Doctor') */
         {
          this.router.navigate(['/dashboard-doctor']);
        } 
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    );
  }
  
}
