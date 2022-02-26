import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateX(-10%)',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateX(0%)',
        })
      ),
      transition('hidden => shown', [animate('0.4s')]),
    ]),
  ],
})
export class ViewComponent implements OnInit {
  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  state1 = 'hidden';

  username: any = `${localStorage
    .getItem('first_name')
    ?.toLocaleLowerCase()}-${localStorage
    .getItem('last_name')
    ?.toLocaleLowerCase()}`;
  survey_id: any;
  survey: SurveyModel = new SurveyModel();

  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
    this.route.paramMap.subscribe((params) => {
      this.survey_id = params.get('id');
    });
    this.surveyService.viewSurvey(this.survey_id).subscribe((response) => {
      let res: any = response;
      this.survey.setValuesView(res);
    });
    console.log(this.survey);
  }
  onEditSurvey(survey_id: Number) {
    this.router.navigate([`${this.username}/edit/${survey_id}`]);
  }

  moveBack() {
    this.router.navigate([`${this.username}/home`]);
  }
  onHome() {
    this.router.navigate([`${this.username}/home`]);
  }
}
