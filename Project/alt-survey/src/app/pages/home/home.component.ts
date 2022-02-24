import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selected: String = 'All Surveys';
  surveySelected: any;
  @Input() username: String = 'sample';
  constructor(private router: Router, private surveyService: SurveyService) {}
  user: any = localStorage.getItem('first_name');
  user_id: any = localStorage.getItem('user_id');
  ngOnInit() {}

  onCreateNewSurvey() {
    this.router.navigate([
      `${localStorage.getItem('first_name')?.toLocaleLowerCase()}-${localStorage
        .getItem('last_name')
        ?.toLocaleLowerCase()}/create`,
    ]);
  }
}
