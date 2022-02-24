import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  constructor(
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  survey_id: any;
  survey: SurveyModel = new SurveyModel();

  ngOnInit() {
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
    this.router.navigate([
      `${localStorage.getItem('first_name')?.toLocaleLowerCase()}-${localStorage
        .getItem('last_name')
        ?.toLocaleLowerCase()}/edit/${survey_id}`,
    ]);
  }

  moveBack() {
    this.router.navigate(['/home']);
  }
}
