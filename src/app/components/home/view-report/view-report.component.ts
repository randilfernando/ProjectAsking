import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {OverallReport} from "../../../types/overall-report.type";

@Component({
  selector: 'ask-view-report',
  templateUrl: './view-report.component.html',
  styles: []
})
export class ViewReportComponent implements OnInit {

  overallReport: OverallReport;

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
          this.overallReport = this.reportService.getOverallReport();
          this.generateAllQuestionsChartData();
          this.generateModuleChartData();
        }
      })
  }

  generateModuleChartData() {
    let dataSet: number[] = [];
    let colorSet: string[] = [];
    for (let module of this.overallReport.modules) {
      this.moduleChart.data.labels.push(module.moduleCode + ' - ' + module.moduleName);
      dataSet.push(module.totalQuestions);
      colorSet.push(ViewReportComponent.getRandomColor());
    }
    this.moduleChart.data.datasets.push({
      data: dataSet,
      backgroundColor: colorSet,
      label: 'Module Report'
    });
  }

  generateAllQuestionsChartData(){
    let answered = this.overallReport.answeredCount;
    let unanswered = this.overallReport.unansweredCount;
    this.allQuestionsChart.data.datasets.push({
      data: [answered, unanswered],
      backgroundColor: ['#1976d2', '#9e9e9e'],
      label: 'Questions'
    });
  }

  static getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


}
