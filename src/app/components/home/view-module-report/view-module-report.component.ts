import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ModuleReport} from "../../../types/module-report.type";
import {ReportService} from "../../../services/report.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ModuleService} from "../../../services/module.service";
import {Module} from "../../../types/module.type";

@Component({
  selector: 'ask-view-module-report',
  templateUrl: './view-module-report.component.html',
  styles: []
})
export class ViewModuleReportComponent implements OnInit {

  moduleList: Module[];
  moduleReport: ModuleReport;

  topicChart = {
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

  moduleQuestionsChart = {
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
            beginAtZero: true
          }
        }]
      }
    }
  };

  constructor(private reportService: ReportService, private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.moduleService.loadModules()
      .subscribe(result => {
        if(result){
          this.moduleList = this.moduleService.getModules();
        }else{
          this.moduleList = null;
        }
      })
  }

  loadReportData(moduleCode: string) {
    this.moduleReport = null;
    this.reportService.loadModuleReport(moduleCode)
      .subscribe(result => {
        if (result) {
          this.moduleReport = this.reportService.getModuleReport();
          this.generateModuleQuestionsChartData();
          this.generateTopicChartData();
        }
      })
  }

  generateTopicChartData() {
    let dataSet: number[] = [];
    let colorSet: string[] = [];
    this.topicChart.data.labels = [];
    for (let topic of this.moduleReport.topics) {
      this.topicChart.data.labels.push(topic._id);
      dataSet.push(topic.count);
      colorSet.push(ViewModuleReportComponent.getRandomColor());
    }
    this.topicChart.data.datasets = [];
    this.topicChart.data.datasets.push({
      data: dataSet,
      backgroundColor: colorSet,
      label: 'Topic Report'
    });
  }

  generateModuleQuestionsChartData() {
    let answered = this.moduleReport.answeredCount;
    let unanswered = this.moduleReport.unansweredCount;
    this.moduleQuestionsChart.data.datasets = [];
    this.moduleQuestionsChart.data.datasets.push({
      data: [answered, unanswered],
      backgroundColor: ['#1976d2', '#9e9e9e'],
      label: 'Questions'
    });
  }

  static getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
