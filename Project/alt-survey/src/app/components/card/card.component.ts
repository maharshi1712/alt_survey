import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FilterPipe } from 'src/app/pages/home/filter.pipe';
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
            stagger('100ms', animate('200ms ease-in', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        query(':leave', animate('20ms ease-out', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class CardComponent implements OnInit {
  isLoaderShow = false;
  surveyNotFound = false;
  pageNotFound = false;
  surveys: SurveyModel[] = [];
  user_id: any;
  @Input() selectedFilter: String = '';
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';
  @Input() searchInput: string = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private home: HomeComponent
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.user_id = localStorage.getItem('user_id');
    // if (changes['selectedFilter'].currentValue === 'All Surveys') {
    //   this.surveyService.getSurvey().subscribe((response) => {
    //     let res: any = response;
    //     this.surveys = [];
    //     res.length === 0
    //       ? (this.isSurveyFound = false)
    //       : (this.isSurveyFound = true);
    //     res.forEach((element: any) => {
    //       this.surveys.push(element);
    //     });
    //   });
    // } else {
    //   this.surveyService.showMySurvey(this.user_id).subscribe((response) => {
    //     this.surveys = this.surveys.filter(
    //       (s) => s.createdBy === localStorage.getItem('firstname')
    //     );
    //     console.log(this.surveys);
    //     let res: any = response;
    //     res.length === 0
    //       ? (this.isSurveyFound = false)
    //       : (this.isSurveyFound = true);
    //   });
    // }

    if (this.selectedFilter === 'All Surveys') {
      this.surveyService.getSurvey().subscribe(
        (response) => {
          let res: any = response;
          if (res.length === 0) {
            this.surveyNotFound = true;
          } else {
            this.surveyNotFound = false;
            this.surveys = [];
            res.forEach((element: any) => {
              this.surveys.push(element);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.surveys = [];
      if (this.surveys.length === 0) {
        this.surveyNotFound = true;
      } else {
        this.surveyNotFound = false;
      }
    }

    console.log(this.surveys);
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
