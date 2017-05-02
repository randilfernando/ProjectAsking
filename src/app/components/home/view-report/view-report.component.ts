import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {Module} from "../../../types/module.type";

@Component({
  selector: 'ask-view-report',
  templateUrl: './view-report.component.html',
  styles: []
})
export class ViewReportComponent implements OnInit {

  isModuleDataLoaded: boolean = false;
  isQuestionDataLoaded: boolean = false;

  moduleList: Module[];

  moduleChart = {
    type: 'doughnut',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };

  allQuestionsChart = {
    type: 'bar',
    data: {
      labels: ['Answered', 'Unanswered'],
      datasets: []
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  };

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.reportService.loadOverallReport()
      .subscribe(result => {
        if (result) {
          this.moduleList = this.reportService.getModuleReport();
          this.generateModuleChartData(this.reportService.getModuleReport());
          this.isModuleDataLoaded = true;
        }
      })

    this.reportService.loadUnanswered()
      .subscribe(result => {
        if(result){
          this.generateAllQuestionsChartData(this.reportService.getAnsweredCount(), this.reportService.getUnansweredCount());
          this.isQuestionDataLoaded = true;
        }
      })
  }

  generateModuleChartData(data: Module[]) {
    let dataSet: number[] = [];
    let colorSet: string[] = [];
    for (let module of data) {
      this.moduleChart.data.labels.push(module.moduleCode + ' - ' + module.moduleName);
      dataSet.push(module.totalQuestions);
      colorSet.push(this.getRandomColor());
    }
    this.moduleChart.data.datasets.push({
      data: dataSet,
      backgroundColor: colorSet,
      label: 'Module Report'
    });
  }

  generateAllQuestionsChartData(answered: number, unanswered: number){
    console.log(answered);
    this.allQuestionsChart.data.datasets.push({
      data: [answered, unanswered],
      backgroundColor: ['#1976d2', '#9e9e9e'],
      label: 'Questions'
    });
  }

  getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
