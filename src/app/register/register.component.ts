import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.http.post('http://138.4.10.37:8081/api/register/', {
      username: this.username,
      email: this.email,
      password: this.password,
      password2: this.password2
    }).subscribe(
      () => {
        alert('Usuario registrado correctamente.');
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400 && error.error) {
          if (error.error.password) {
            alert(error.error.password[0]);
          } else if (error.error.email) {
            alert('El email introducido ya pertence a un usuario o no sigue el formato adecuado.');
          } else {
            alert('Complete todos los campos para compeltar el registro.');
          }
        } else {
          alert('Ocurrió un error durante el registro. Inténtelo de nuevo.');
        }
      }
    );
  }
}
