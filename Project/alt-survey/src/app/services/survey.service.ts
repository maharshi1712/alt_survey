import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  public getSurvey() {
    return this.http.get(
      `${baseUrl}surveyConfig/user/${localStorage.getItem('user_id')}`
    );
  }

  public viewSurvey(survey_id: Number) {
    this.http.get(`${baseUrl}surveyConfig/${survey_id}`);
  }
}
