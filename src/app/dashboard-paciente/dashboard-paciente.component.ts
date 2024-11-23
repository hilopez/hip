import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: ['./dashboard-paciente.component.css']
})
export class DashboardPacienteComponent {
  cuestionarios = ['Cuestionario 1', 'Cuestionario 2', 'Cuestionario 3', 'Cuestionario 4', 'Cuestionario 5'];
  // Aquí puedes agregar la lógica para obtener los datos y resultados de los cuestionarios
}
