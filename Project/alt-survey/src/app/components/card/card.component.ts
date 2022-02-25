import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('150ms', animate('300ms ease-in', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms ease-out', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  surveys: SurveyModel[] = [];
  user_id: any;
  @Input() selectedFilter: String = '';
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private home: HomeComponent
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.user_id = localStorage.getItem('user_id');
    this.selectedFilter === 'All Surveys'
      ? this.surveyService.getSurvey().subscribe((response) => {
          this.surveys = [];
          let res: any = response;
          res.forEach((element: any) => {
            this.surveys.push(element);
          });
        })
      : this.surveyService.showMySurvey(this.user_id).subscribe((response) => {
          this.surveys = [];
          let res: any = response;
          res.forEach((element: any) => {
            this.surveys.push(element);
          });
        });
  }

  onViewSurvey(suvrey_id: Number) {
    this.router.navigate([
      `${localStorage.getItem('first_name')?.toLocaleLowerCase()}-${localStorage
        .getItem('last_name')
        ?.toLocaleLowerCase()}/view/${suvrey_id}/`,
    ]);
    this.surveyService.viewSurvey(suvrey_id);
  }
}
