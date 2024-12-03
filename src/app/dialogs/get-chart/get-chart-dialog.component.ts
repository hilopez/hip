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

  chart: any;
  chartOptions = {
    data: [{
      type: "column",
      dataPoints: this.dps
    }]
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GetChart,
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {}

  async ngOnInit(): Promise<void> {
    this.patientId = this.apiService.getCurrentUser();

    const getQuestionnairesByPatientIdResponse = this.apiService.getQuestionairesByPatientId(this.patientId, this.data.questionnaireId);
    this.questionnaires = await lastValueFrom(getQuestionnairesByPatientIdResponse);
    this.questionnaires.forEach(questionnaire => {
      let date = this.datePipe.transform(questionnaire.created_at, 'dd/MM/yyyy');
      if (date) {
        this.dps.push({
          label: date,
          y: questionnaire.score
        });
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
