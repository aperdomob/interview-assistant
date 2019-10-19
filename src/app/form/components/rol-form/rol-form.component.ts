import { Component, OnInit } from '@angular/core';
import { sdet } from '../../../assets/sdet';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { Assessment, IKnowledge } from '../../entities/IKnowledge';
import { InterviewMapper } from '../../mapper/InterviewMapper';
import { MatRadioChange } from '@angular/material/radio';

/** Flat node with expandable and level information */
class FlatNode {
  id: string;
  expandable: boolean;
  name: string;
  hasSkill: Assessment;
  level: number;
}

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.css']
})
export class RolFormComponent implements OnInit {
  private nestedNodeMap: Map<string, FlatNode>;

  rolName = sdet.name;

  assestmentValues = [{
    text: 'Si',
    value: Assessment .YES
  }, {
    text: 'No',
    value: Assessment.NO
  }, {
    text: 'No se ha valorado',
    value: Assessment.UNKNOWN
  }];

  treeControl = new FlatTreeControl<FlatNode>((node) => node.level, (node) => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.skills);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  interview: IKnowledge;


  constructor() {
    this.interview = InterviewMapper.createInterviewFromTemplate(sdet);
    this.dataSource.data = this.interview.skills;
  }

  ngOnInit() {
    this.treeControl.expandAll();
  }

  onAssessmentChange(event: MatRadioChange, node: any) {
    this.updateAssessment(node, event.value);
    console.log(node);
    // this.skill.hasSkill = event.value;
    // this.assessmentChange.emit(this.skill);
  }

  public hasChild(_: number, node: FlatNode) {
    return  node.expandable;
  }

  private _transformer(node: IKnowledge, level: number) {
    if (typeof this.nestedNodeMap === 'undefined') {
      this.nestedNodeMap = new Map<string, FlatNode>();
    }

    const existingNode = this.nestedNodeMap.get(node.id);
    const flatNode = existingNode && existingNode.id === node.id
        ? existingNode
        : new FlatNode();

    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.hasSkill = node.hasSkill;
    flatNode.expandable = node.hasSkill !== Assessment.NO && node.skills && node.skills.length > 0;

    this.nestedNodeMap.set(node.id, flatNode);
    return flatNode;
  }

  private updateAssessment(skill: FlatNode, assestment: Assessment): void {
    const skillToUpdate = this.findSkill(skill.id);

    if (typeof skillToUpdate !== 'undefined') {
      skillToUpdate.hasSkill = assestment;
      this.dataSource.data = this.interview.skills;
    }
  }

  private findSkill(id: string): IKnowledge {
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
}
