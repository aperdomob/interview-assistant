import { Component, OnInit, Input } from '@angular/core';
import { ISkill } from '../../entities/ISkill';
import { IKnowledgeAssessment } from '../../entities/IknowledgeAssessment';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
  @Input() skill: IKnowledgeAssessment;

  constructor() { }

  ngOnInit() {
  }
}
