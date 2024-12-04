import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GetChart} from '../models/get-chart';
import {ApiService} from '../../api.service';
import {lastValueFrom} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-get-chart',
  templateUrl: './get-chart-dialog.component.html',
  styleUrl: '../../dashboard-paciente/dashboard-paciente.component.css'
})
export class GetChartDialogComponent implements OnInit{
  patientId: string = "";
  questionnaires: Array<any> = [];
  dps: { label: string, y: number }[] = [];
  dps2: { label: string, y: number }[] = [];

  chart: any;
  chartOptions = {
    data: [{
      type: "column",
      dataPoints: this.dps
    }]
  }

  chartOptions2 = {
    axisY: {
      title: "Escala de Ansiedad"
    },
    axisY2: {
      title: "Escala de Depresion"
    },
    toolTip: {
      shared: true
    },
    data: [{
      type: "column",
      name: "Ansiedad",
      dataPoints: this.dps
    }, {
      type: "column",
      name: "Depresion",
      axisYType: "secondary",
      dataPoints: this.dps2
    }]
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GetChart,
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.data.role == "Patient") {
      this.patientId = this.apiService.getCurrentUser();
    } else {
      this.patientId = this.data.patientId;
    }

    const getQuestionnairesByPatientIdResponse = this.apiService.getQuestionairesByPatientId(this.patientId, this.data.questionnaireId);
    this.questionnaires = await lastValueFrom(getQuestionnairesByPatientIdResponse);
    this.questionnaires.forEach(questionnaire => {
      let date = this.datePipe.transform(questionnaire.created_at, 'dd/MM/yyyy');
      if (date) {
        this.dps.push({
          label: date,
          y: questionnaire.score
        });
        if (this.data.questionnaireId == "3") {
          this.dps2.push({
            label: date,
            y: questionnaire.score2
          });
        }
      }
    });

    this.updateChart();
  }

  getChartInstance(chart: object) {
    this.chart = chart;
  }
  updateChart = () => {
    if (this.chart) {
      this.chart.render();
    }
  }
}
