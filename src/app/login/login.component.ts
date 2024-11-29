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
    this.errorMessage = "";
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        this.apiService.setCurrentUser(response.id);
        if (response.rol === 'Paciente') {
          this.router.navigate(['/dashboard-paciente']).then();
        } else if (response.rol === 'Doctor')
         {
          this.router.navigate(['/home-doctor']).then();
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

}
