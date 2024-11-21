// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Verificar si el usuario está autenticado
    if (this.apiService.isLoggedIn()) {
      // Obtener el rol del usuario desde el ApiService (o localStorage)
      const userRole = this.apiService.getUserRole(); // Por ejemplo, 'Paciente' o 'Personal Clínico'

      // Validar si el rol del usuario coincide con el rol requerido para la ruta
      const requiredRole = route.data['role']; // Definir el rol necesario en las rutas

      if (requiredRole && userRole !== requiredRole) {
        alert('No tienes permiso para acceder a esta página.');
        this.router.navigate(['/login']);
        return false; // Si el rol no coincide, no permite el acceso
      }

      return true; // Si todo está bien, permite el acceso
    } else {
      // Si el usuario no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
