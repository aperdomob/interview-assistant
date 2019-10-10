import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IKnowledgeAssessment } from '../../entities/IknowledgeAssessment';
import { Assessment } from '../../entities/IKnowledge';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
  @Input() skill: IKnowledgeAssessment;
  @Output() assessmentChange = new EventEmitter<IKnowledgeAssessment>();

  assestmentValues = [{
    text: 'Si',
    value: Assessment.YES
  }, {
    text: 'No',
    value: Assessment.NO
  }, {
    text: 'No se ha valorado',
    value: Assessment.UNKNOWN
  }];

  assessment = this.skill ? this.skill.hasSkill : Assessment.UNKNOWN;

  constructor() { }

  ngOnInit() {
  }

  updateAssesment(event: MatRadioChange) {
    this.skill.hasSkill = event.value;
    this.assessmentChange.emit(this.skill);
  }
}
