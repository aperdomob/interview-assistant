import { IInterviewTempale } from '../entities/IInterviewTemplate';
import { IKnowledge, Assessment } from '../entities/IKnowledge';
import { v4 } from 'uuid';

export class InterviewMapper {
  public static createInterviewFromTemplate(template: IInterviewTempale): IKnowledge {
    return {
      id: v4(),
      name: template.name,
      hasSkill: Assessment.UNKNOWN,
      skills: template.skills.map((skillTemplate) => InterviewMapper.createInterviewFromTemplate(skillTemplate))
    };
  }
}
