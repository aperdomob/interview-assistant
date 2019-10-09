import { Component, OnInit } from '@angular/core';
import { IRol } from '../../entities/IRol';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.css']
})
export class RolFormComponent implements OnInit {
  rol: IRol = {
    name: 'Software Developer Engineer in Test',
    skills: [{
      name: 'Locators',
      items: [
        'XPath',
        'ID',
        'Class',
        'CSS'
      ],
      suggestedQuestions: [
        'Question 1',
        'Question 2',
        'Question 3'
      ]
    }]
  };

  constructor() { }

  ngOnInit() {
  }

}
