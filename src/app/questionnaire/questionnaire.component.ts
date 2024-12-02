import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit {
  questionnaireId: string = "";
  patientId: string = "";
  role: string = "";
  questionaire: { title: string };
  questions: Array<any> = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute,
              private snackBar: MatSnackBar, private router: Router) {
    this.questionaire = { title: "" };
  }

  async ngOnInit(): Promise<void> {
    this.questionnaireId = this.route.snapshot.params['idQuestionnaire'];
    this.patientId = this.route.snapshot.params['idPatient'];
    this.role = this.route.snapshot.params['role'];

    const getQuestionnaireByIdResponse = this.apiService.getQuestionaireById(this.questionnaireId);
    this.questionaire = await lastValueFrom(getQuestionnaireByIdResponse);

    const getQuestionsByQuestionnaireIdResponse = this.apiService.getQuestionsByQuestionnaireId(this.questionnaireId);
    this.questions = await lastValueFrom(getQuestionsByQuestionnaireIdResponse);
  }

  finishQuestionnaire() {
    const hasUnansweredQuestion = this.questions.filter(question => !question.answer && question.answer !== 0);

    if (hasUnansweredQuestion.length > 0) {
      this.snackBar.open("Hay preguntas sin responder", "Entendido", { duration: 2000});
    } else {
      let score: number;
      if (this.questionnaireId == "1") {
        score = this.calculateScoreQuestionnaire1();
      } else if (this.questionnaireId == "2") {
        score = this.calculateScoreQuestionnaire2();
      } else if (this.questionnaireId == "3") {
        score = this.calculateScoreQuestionnaire3();
      } else {
        score = this.calculateScoreQuestionnaire4();
      }

      this.apiService.createUserQuestionnaire({user: this.patientId, questionnaire: this.questionnaireId, score: score}).subscribe(
        () => {
          if (this.role == "Doctor") {
            this.router.navigate(['/dashboard-info-paciente', this.patientId]).then();
          } else {
            this.router.navigate(['/dashboard-paciente']).then();
          }
        }
      );
    }
  }

  calculateScoreQuestionnaire1 () {
    return 5;
  }

  calculateScoreQuestionnaire2 () {
    return 10;
  }

  calculateScoreQuestionnaire3 () {
    return 15;
  }

  calculateScoreQuestionnaire4 () {
    return 20;
  }

  navigateBack() {
    this.router.navigate(['/dashboard-info-paciente', this.patientId]).then();
  }
}
