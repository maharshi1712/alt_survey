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
    return this.http.get(`${baseUrl}surveyConfig/`);
  }

  userName: String = '';

  setUsername(username: String) {
    this.userName = username;
  }
  getUsername() {
    return this.userName;
  }
  // public addSurvey();
}
