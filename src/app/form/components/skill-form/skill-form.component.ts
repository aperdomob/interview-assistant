import { Component, OnInit } from '@angular/core';
import { ISkill } from '../../entities/ISkill';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
  skill: ISkill = {
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
  };

  constructor() { }

  ngOnInit() {
  }
}
