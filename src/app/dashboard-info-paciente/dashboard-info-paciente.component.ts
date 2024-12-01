import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-dashboard-info-paciente',
  templateUrl: './dashboard-info-paciente.component.html',
  styleUrl: './dashboard-info-paciente.component.css'
})
export class DashboardInfoPacienteComponent implements OnInit{
  patientId: string;
  patient: { id: string, email: string };
  questionaires: Array<any> = [];
  questionairesDone: Array<any> = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.patientId = "";
    this.patient = {id: "", email: ""};
  }
  async ngOnInit(): Promise<void> {
    this.patientId = this.route.snapshot.params['idPatient'];

    const getPatientByIdResponse = this.apiService.getPatientById(this.patientId);
    this.patient = await lastValueFrom(getPatientByIdResponse);

    const getQuestionnairesResponse = this.apiService.getAllQuestionaires();
    this.questionaires = await lastValueFrom(getQuestionnairesResponse);

    const getQuestionnairesDoneResponse = this.apiService.getQuestionairesByPatientId(this.patientId);
    this.questionairesDone = await lastValueFrom(getQuestionnairesDoneResponse);

    this.questionaires.forEach(questionnaire => {
      let questionnaireDone = this.questionairesDone.find((questionnaireDone) => questionnaire.id === questionnaireDone.id);

      questionnaire.done = !!questionnaireDone;
    })
  }

}
