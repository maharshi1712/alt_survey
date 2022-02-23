import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

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
      this.survey.setValues(res);
    });
  }

  onSubmitSurvey() {
    this.surveyService.updateSurvey(this.survey, this.survey_id);
    console.log(this.survey);
  }

  onDeleteSurvey() {}
}
