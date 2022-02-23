import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['superscript']],
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

  constructor(private surveyService: SurveyService) {}
  public survey = {
    surveyName: '',
    surveyType: '',
    messageSubject: '',
    messageBody: '',
    delay: '',
    isActive: '',
    createdBy: '',
    modifiedBy: '',
  };
  ngOnInit(): void {}
  formSubmit() {}
}
