import { Injectable } from '@angular/core';
import { IKnowledge, Assessment } from '../entities/IKnowledge';
import { BehaviorSubject } from 'rxjs';
import { IKnowledgeAssessment } from '../entities/IknowledgeAssessment';
import { IInterviewTempale } from '../entities/IInterviewTemplate';
import { InterviewMapper } from '../mapper/InterviewMapper';

@Injectable({
  providedIn: 'root'
})
export class AssistantEngineService {
  private interview: IKnowledge;
  private suggestionsBehaviorSubject = new BehaviorSubject<IKnowledgeAssessment[]>([]);

  public suggestions = this.suggestionsBehaviorSubject.asObservable();

  constructor() { }

  public loadInterview(template: IInterviewTempale): void {
    this.interview = InterviewMapper.createInterviewFromTemplate(template);
    const suggestions = this.getSuggestion();
    this.suggestionsBehaviorSubject.next(suggestions);
  }

  public updateAssessment(skill: IKnowledgeAssessment): void {
    const skillToUpdate = this.findSkill(skill.id);

    if (typeof skillToUpdate !== 'undefined') {
      skillToUpdate.hasSkill = skill.hasSkill;
      const suggestions = this.getSuggestion();
      this.suggestionsBehaviorSubject.next(suggestions);
    }
  }

  private findSkill(id: string): IKnowledgeAssessment {
    return this.findSkillIntoInterview(id, this.interview);
  }

  private findSkillIntoInterview(id: string, interviewItem: IKnowledge) {
    if (interviewItem.id === id) {
      return interviewItem;
    }

    if (interviewItem.skills.length === 0) {
      return undefined;
    }

    const internals = interviewItem.skills
      .map((current) => this.findSkillIntoInterview(id, current))
      .filter((current) => typeof current !== 'undefined');

    if (internals.length > 0) {
      return internals[0];
    }

    return undefined;
  }

  private getSuggestion(): IKnowledgeAssessment[] {
    const suggestions = this.inspectInterview(this.interview);

    // return suggestions.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
    return suggestions;
  }

  private inspectInterview(interviewItem: IKnowledge): IKnowledgeAssessment[] {
    switch (interviewItem.hasSkill) {
      case Assessment.NO:
        return [];

      case Assessment.YES:
        const skills = interviewItem.skills.reduce((pv, cv) => pv.concat(this.inspectInterview(cv)), []);
        return skills;

      case Assessment.UNKNOWN:
        return [this.transform(interviewItem)];

      default:
        return [];
    }
  }

  private transform(knowledge: IKnowledge): IKnowledgeAssessment {
    return {
      id: knowledge.id,
      name: knowledge.name,
      hasSkill: knowledge.hasSkill
    };
  }
}
