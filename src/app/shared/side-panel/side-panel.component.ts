import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ask-side-panel',
  templateUrl: 'side-panel.component.html',
  styleUrls: ['side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input()
  enrolledModules = [
    {name: 'Object Oriented Programming'},
    {name: 'Theory of Computing'},
    {name: 'Data Structures and Algorithms'},
    {name: 'Intelligent Systems'},
    {name: 'Image Processing'},
    {name: 'Software Engineering'},
    {name: 'Graph theory'},
    {name: 'Theory of Electricity'},
    {name: 'Aspects of Civil Engineering'},
    {name: 'Mechanical Engineering'},
    {name: 'Introduction to Manufacturing Engineering'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
