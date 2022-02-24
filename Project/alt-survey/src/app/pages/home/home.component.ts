import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selected = 'option1';
  @Input() username: String = 'sample';
  constructor(private router: Router, private surveyService: SurveyService) {}
  user: any = localStorage.getItem('first_name');
  user_id: any = localStorage.getItem('user_id');
  ngOnInit() {}

  onCreateNewSurvey() {
    this.router.navigate(['/create']);
  }

  ShowAllSurveys() {
    console.log('clicked');
    return this.surveyService.showAllSurvey();
    console.log("clicked");
    
  }
  ShowMySurveys() {
    console.log(this.user_id);
    
    return this.surveyService.showUserSurvey(this.user_id);
  }
}
