export enum Assessment {
  YES,
  NO,
  UNKNOWN
}

export interface IKnowledge {
  id: string;
  name: string;
  hasSkill: Assessment;
  skills: IKnowledge[];
}
