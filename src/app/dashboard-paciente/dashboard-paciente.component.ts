import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: ['./dashboard-paciente.component.css']
})
export class DashboardPacienteComponent implements OnInit{
  patient: { id: string, email: string };
  questionaires: Array<any> = [];
  questionairesDone: Array<any> = [];

  constructor(private apiService: ApiService) {
    this.patient = {id: "", email: ""};
  }
  async ngOnInit(): Promise<void> {
    const getPatientByIdResponse = this.apiService.getMyPatient();
    this.patient = await lastValueFrom(getPatientByIdResponse);

    const getQuestionnairesResponse = this.apiService.getAllQuestionaires();
    this.questionaires = await lastValueFrom(getQuestionnairesResponse);

    const getQuestionnairesDoneResponse = this.apiService.getQuestionairesByMyPatient();
    this.questionairesDone = await lastValueFrom(getQuestionnairesDoneResponse);

    this.questionaires.forEach(questionnaire => {
      let questionnaireDone = this.questionairesDone.find((questionnaireDone) => questionnaire.id === questionnaireDone.id);

      questionnaire.done = !!questionnaireDone;
    })
  }
}
