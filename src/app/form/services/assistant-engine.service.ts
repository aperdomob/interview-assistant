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

  private getSuggestion(): IKnowledgeAssessment[] {
    return this.inspectInterview(this.interview);
  }

  private inspectInterview(interviewItem: IKnowledge): IKnowledgeAssessment[] {
    switch (interviewItem.hasSkill) {
      case Assessment.NO:
        return [];

      case Assessment.YES:
        return interviewItem.skills.reduce((pv, cv) => pv.concat(this.inspectInterview(cv)), []);

      case Assessment.UNKNOWN:
        return [interviewItem];

      default:
        return [];
    }
  }
}
