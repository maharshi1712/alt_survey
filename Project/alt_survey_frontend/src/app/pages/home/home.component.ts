import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/services/survey.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(10%)',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      transition('hidden => shown', [animate('0.4s')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  search: string = '';
  selected: String = 'All Surveys';
  surveySelected: any;
  @Input() username: String = 'sample';
  constructor(private router: Router, private surveyService: SurveyService) {}

  state1 = 'hidden';
  user: any = localStorage.getItem('first_name');
  user_id: any = localStorage.getItem('user_id');

  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
  }

  onCreateNewSurvey() {
    this.router.navigate([
      `${localStorage.getItem('first_name')?.toLocaleLowerCase()}-${localStorage
        .getItem('last_name')
        ?.toLocaleLowerCase()}/create`,
    ]);
  }
  onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Any unsaved changes will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
