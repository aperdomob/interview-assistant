import { IInterviewTempale } from '../entities/IInterviewTemplate';
import { IKnowledge, Assessment } from '../entities/IKnowledge';

export class InterviewMapper {
  public static createInterviewFromTemplate(template: IInterviewTempale): IKnowledge {
    return {
      name: template.name,
      hasSkill: Assessment.UNKNOWN,
      skills: template.skills.map((skillTemplate) => InterviewMapper.createInterviewFromTemplate(skillTemplate))
    };
  }
}
