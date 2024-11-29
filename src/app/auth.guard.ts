import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const userId = this.apiService.getCurrentUser();
    if (userId !== "") {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  }
}
