import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { DashboardDoctorComponent } from './dashboard-doctor/dashboard-doctor.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard-paciente', component: DashboardPacienteComponent, canActivate: [AuthGuard] },
  { path: 'dashboard-doctor', component: DashboardDoctorComponent, canActivate: [AuthGuard] }
];
