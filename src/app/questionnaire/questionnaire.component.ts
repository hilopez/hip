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
    this.questions.forEach(question => {
      if (question.type_question == "Select") {
        question.optionsSelect = question.options.split(',').map((opcion: string) => opcion.trim());
      }
    });
  }

  finishQuestionnaire() {
    const hasUnansweredQuestion = this.questions.filter(question => !question.answer && question.answer !== 0);

    if (hasUnansweredQuestion.length > 0) {
      this.snackBar.open("Hay preguntas sin responder", "Entendido", { duration: 2000});
    } else {
      let score: number;
      let score2 = 0;
      if (this.questionnaireId == "1") {
        score = this.calculateScoreQuestionnaire1();
      } else if (this.questionnaireId == "2") {
        score = this.calculateScoreQuestionnaire2();
      } else if (this.questionnaireId == "3") {
        let objectSuma = this.calculateScoreQuestionnaire3();
        score = objectSuma.sumaAnsiedad;
        score2 = objectSuma.sumaDepresion;
      } else {
        score = this.calculateScoreQuestionnaire4();
      }

      this.apiService.createUserQuestionnaire({user: this.patientId, questionnaire: this.questionnaireId, score: score, score2: score2}).subscribe(
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
    let suma = 0;
    this.questions.forEach(question => {
      suma += question.answer;
    });
    return suma;
  }

  calculateScoreQuestionnaire2 () {
    let item1 = 8 * this.questions.at(0).answer * this.questions.at(1).answer;
    let item2 = 4 * this.questions.at(2).answer * this.questions.at(3).answer;
    let item3 = 3.3 * this.questions.at(4).answer * this.questions.at(5).answer;

    return item1 + item2 + item3;
  }

  calculateScoreQuestionnaire3 () {
    let sumaAnsiedad = 0;
    let sumaDepresion = 0;
    this.questions.forEach(question => {
      if (question.order in [1, 2, 3, 4, 5, 6, 7]) {
        sumaAnsiedad = sumaAnsiedad + question.answer;
      } else {
        sumaDepresion = sumaDepresion + question.answer;
      }
    });
    return {sumaAnsiedad: sumaAnsiedad, sumaDepresion: sumaDepresion};
  }

  calculateScoreQuestionnaire4 () {
    let componente1 = this.questions.at(14).answer;

    let sumC2 = this.questions.at(1).answer + this.questions.at(4).answer;
    let componente2 = sumC2 == 0 ? 0 : sumC2 == 1 || sumC2 == 2 ? 1 : sumC2 == 3 || sumC2 == 4 ? 2 : 3;

    let componente3 = this.questions.at(3).answer;

    let componente4 = 1;

    let sumC5 = 0;
    this.questions.forEach(question => {
      if (question.order in [6, 7, 8, 9, 10, 11, 12, 13, 14]) {
        sumC5 += question.answer;
      }
    });
    let componente5 = sumC2 == 0 ? 0 : sumC2 >= 1 && sumC2 <= 9 ? 1 : sumC2 >= 10 && sumC2 <= 18 ? 2 : 3;

    let componente6 = this.questions.at(15).answer;

    let sumC7 = this.questions.at(7).answer + this.questions.at(8).answer;
    let componente7 = sumC7 == 0 ? 0 : sumC7 == 1 || sumC7 == 2 ? 1 : sumC7 == 3 || sumC7 == 4 ? 2 : 3;

    return componente1 + componente2 + componente3 + componente4 + componente5 + componente6 + componente7;
  }

  navigateBack() {
    this.router.navigate(['/dashboard-info-paciente', this.patientId]).then();
  }
}
