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
    this.apiService.obtenerCuestionarios().subscribe((data) => {
      this.cuestionarios = data;
    });

    this.apiService.obtenerResultados().subscribe((data) => {
      this.resultados = data;
    });
  }
}

