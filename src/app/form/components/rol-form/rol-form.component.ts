import { Component, OnInit } from '@angular/core';
import { IRol } from '../../entities/IRol';
import { AssistantEngineService } from '../../services/assistant-engine.service';
import { IKnowledgeAssessment } from '../../entities/IknowledgeAssessment';
import { sdet } from '../../../assets/sdet';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.css']
})
export class RolFormComponent implements OnInit {
  rolName = sdet.name;
  skills: IKnowledgeAssessment[] = [];

  constructor(private assistantEngineService: AssistantEngineService) { }

  ngOnInit() {
    this.assistantEngineService.suggestions.subscribe((skills: IKnowledgeAssessment[]) => {
      this.skills = skills;
    });

    this.assistantEngineService.loadInterview(sdet);
  }
}
