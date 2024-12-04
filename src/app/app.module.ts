import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardPacienteComponent } from './dashboard-paciente/dashboard-paciente.component';
import { ApiService } from './api.service';
import { AuthGuard } from './auth.guard';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDoctorComponent } from './home-doctor/home-doctor.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardInfoPacienteComponent } from './dashboard-info-paciente/dashboard-info-paciente.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import {GetChartDialogComponent} from './dialogs/get-chart/get-chart-dialog.component';
import {CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardPacienteComponent,
    HomeDoctorComponent,
    DashboardInfoPacienteComponent,
    QuestionnaireComponent,
    GetChartDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatSnackBarModule,
    MatSliderModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),  // Configuración de rutas
    CanvasJSAngularChartsModule
  ],
  providers: [ApiService,provideHttpClient(), AuthGuard,
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'fr'},],  // Servicios y guards
  bootstrap: [AppComponent]
})
export class AppModule { }
