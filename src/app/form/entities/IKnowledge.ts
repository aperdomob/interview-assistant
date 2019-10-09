export enum Assessment {
  YES,
  NO,
  UNKNOWN
}

export interface IKnowledge {
  name: string;
  hasSkill: Assessment;
  skills: IKnowledge[];
}
