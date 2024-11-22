import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.css'],
})
export class DashboardDoctorComponent implements OnInit {
  pacientes: any[] = []; // Inicializamos la lista de pacientes

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarPacientes(); // Cargamos los pacientes al inicializar
  }

  cargarPacientes(): void {
    this.apiService.obtenerPacientesDeCentro().subscribe(
      (data: any[]) => {
        this.pacientes = data; // Asignamos los datos obtenidos
      },
      (error) => {
        console.error('Error al cargar los pacientes:', error);
      }
    );
  }

  verDetallePaciente(pacienteId: number): void {
    alert(`Mostrando detalles del paciente con ID: ${pacienteId}`);
    // Aquí puedes implementar la lógica adicional para mostrar detalles
  }
}
