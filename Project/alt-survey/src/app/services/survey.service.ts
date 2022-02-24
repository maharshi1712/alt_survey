import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import baseUrl from './helper';
import { SurveyModel } from '../models/survey.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  public getSurvey() {
    return this.http.get(`${baseUrl}surveyConfig/`);
  }

  public viewSurvey(survey_id: Number) {
    return this.http.get(`${baseUrl}surveyConfig/${survey_id}`);
  }

  public addSurvey(survey: any) {
    return this.http.post(`${baseUrl}surveyConfig/`, survey);
  }

  public updateSurvey(survey: SurveyModel, survey_id: Number) {
    return this.http.put(`${baseUrl}surveyConfig/${survey_id}`, survey);
  }

  public deleteSurvey(survey_id: Number) {
    this.http.delete(`${baseUrl}surveyConfig/${survey_id}`);
  }

  public showAllSurvey() {
    return this.http.get(`${baseUrl}surveyConfig/`);
  }

  public showMySurvey(user_id: Number) {
    return this.http.get(`${baseUrl}surveyConfig/user/${user_id}`);
  }
}
