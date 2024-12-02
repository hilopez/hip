import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-dashboard-info-paciente',
  templateUrl: './dashboard-info-paciente.component.html',
  styleUrl: './dashboard-info-paciente.component.css'
})
export class DashboardInfoPacienteComponent implements OnInit{
  patientId: string;
  patient: { id: string, name: string };
  questionaires: Array<any> = [];
  questionairesDone: Array<any> = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private router: Router) {
    this.patientId = "";
    this.patient = {id: "", name: ""};
  }
  async ngOnInit(): Promise<void> {
    this.patientId = this.route.snapshot.params['idPatient'];

    const getPatientByIdResponse = this.apiService.getPatientById(this.patientId);
    this.patient = await lastValueFrom(getPatientByIdResponse);

    const getQuestionnairesResponse = this.apiService.getAllQuestionaires();
    this.questionaires = await lastValueFrom(getQuestionnairesResponse);

    const getQuestionnairesDoneResponse = this.apiService.getQuestionairesUnDoneByPatientId(this.patientId);
    this.questionairesDone = await lastValueFrom(getQuestionnairesDoneResponse);

    this.questionaires.forEach(questionnaire => {
      let questionnaireDone = this.questionairesDone.find((questionnaireDone) => questionnaire.id === questionnaireDone.questionnaire);

      questionnaire.done = !!questionnaireDone;
    })
  }

  navigateBack() {
    this.router.navigate(['/home-doctor']).then();
  }

  async newAttempt(questionnaireId: number) {
    let questionnaire = this.questionaires.find(questionnaire => questionnaire.id === questionnaireId);
    if (questionnaire) {
      let new_questionnaire = { user: this.patientId, questionnaire: questionnaireId, new_attempt: true };

      const getQuestionnairesDoneResponse = this.apiService.updateQuestionairesById(questionnaireId, new_questionnaire);
      this.questionairesDone = await lastValueFrom(getQuestionnairesDoneResponse);

      questionnaire.done = false;
    }
  }
}
