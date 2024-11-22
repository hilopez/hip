import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: ['./dashboard-paciente.component.css'],
})
export class DashboardPacienteComponent implements OnInit {
  cuestionarios: any[] = [];
  resultados: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Cargar cuestionarios
    this.apiService.obtenerCuestionarios().subscribe(
      (data) => {
        this.cuestionarios = data || []; // Asegurarse de que siempre sea un array
      },
      (error) => {
        console.error('Error al cargar cuestionarios:', error);
      }
    );

    // Cargar resultados
    this.apiService.obtenerResultados().subscribe(
      (data) => {
        this.resultados = data || []; // Asegurarse de que siempre sea un array
      },
      (error) => {
        console.error('Error al cargar resultados:', error);
      }
    );
  }

  rellenarCuestionario(cuestionarioId: number): void {
    alert(`Rellenando cuestionario con ID: ${cuestionarioId}`);
    // Aquí puedes añadir lógica para redirigir a un formulario o similar
  }
}
