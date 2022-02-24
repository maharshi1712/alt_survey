import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
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

  ngOnInit() {
    // this.surveyService.getSurvey().subscribe((response) => {
    //   let res: any = response;
    //   res.forEach((element: any) => {
    //     this.surveys.push(element);
    //   });
    // });
    //cards me values change krna hai
  }

  ngOnChanges(changes: SimpleChanges): void {
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
