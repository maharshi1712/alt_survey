import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SurveyService } from '../../services/survey.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public Editor = ClassicEditor;
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
