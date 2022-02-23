import { Component, OnInit, Input } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  surveys: SurveyModel[] = [];
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveyService.getSurvey().subscribe((response) => {
      let res: any = response;
      res.forEach((element: any) => {
        this.surveys.push(element);
      });
    });
  }

  onViewSurvey(suvrey_id: Number) {
    this.router.navigate([`view/${suvrey_id}/`]);
    this.surveyService.viewSurvey(suvrey_id);
  }
}
