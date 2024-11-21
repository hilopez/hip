<div class="dashboard-container">
  <h2 class="dashboard-title">Dashboard Doctor</h2>

  <div *ngIf="pacientes.length > 0">
    <h3 class="section-title">Pacientes del Centro</h3>
    <ul class="list">
      <li *ngFor="let paciente of pacientes" class="list-item">
        <p class="item-name">{{ paciente.nombre }} - {{ paciente.estado }}</p>
        <button class="action-button" (click)="verDetallePaciente(paciente.id)">Ver Detalles</button>
      </li>
    </ul>
  </div>

  <div *ngIf="pacientes.length === 0">
    <p>No hay pacientes disponibles.</p>
  </div>
</div>
