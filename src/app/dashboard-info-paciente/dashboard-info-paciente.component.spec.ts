import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoPacienteComponent } from './dashboard-info-paciente.component';

describe('DashboardInfoPacienteComponent', () => {
  let component: DashboardInfoPacienteComponent;
  let fixture: ComponentFixture<DashboardInfoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardInfoPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardInfoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
