import { Component, OnInit, Input } from '@angular/core';
import { ISkill } from '../../entities/ISkill';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.css']
})
export class SkillFormComponent implements OnInit {
  @Input() skill: ISkill;

  constructor() { }

  ngOnInit() {
  }
}
