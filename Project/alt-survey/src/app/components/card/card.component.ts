import { Component, OnInit, Input } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  surveys: Survey[] = [];
  @Input() surveyName: String = '';
  @Input() surveyType: String = '';

  constructor(private surveyService: SurveyService) {}

  ngOnInit() {
    this.surveyService.getSurvey().subscribe((response) => {
      let res: any = response;
      res.forEach((element: any) => {
        this.surveys.push(element);
      });
    });
  }
}
