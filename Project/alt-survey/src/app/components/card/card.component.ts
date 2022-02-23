import { Component, OnInit, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from '../../services/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  surveys: Survey[] = [];
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';

  constructor(private surveyService: SurveyService, private router: Router) {}

  ngOnInit() {
    this.surveyService.getSurvey().subscribe((response) => {
      let res: any = response;
      res.forEach((element: any) => {
        this.surveys.push(element);
      });
      console.log(this.surveys);
    });
  }

  onViewSurvey(suvrey_id: Number) {
    this.router.navigate(['/view']);
    this.surveyService.viewSurvey(suvrey_id);
  }
}
