import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SurveyModel } from 'src/app/models/survey.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
    toolbarHiddenButtons: [
      [
        'superscript'
      ],
      [
        'insertImage',
        'insertVideo',
        'link',
        'unlink'
      ]
    ],
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
    private router: Router,
    private _snack: MatSnackBar
  ) {}

  state1 = 'hidden';

  username: any = `${localStorage
    .getItem('first_name')
    ?.toLocaleLowerCase()}-${localStorage
    .getItem('last_name')
    ?.toLocaleLowerCase()}`;
  user_id: any = localStorage.getItem('user_id');
  survey: SurveyModel = new SurveyModel();
  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
  }
  formSubmit() {
    this.survey.user.id = this.user_id;
    this.surveyService.addSurvey(this.survey).subscribe(
      (survey: any) => {
        //Success
        console.log(this.survey);
        //alert("Success");
        Swal.fire('Your survey has been created!', 'success');
        setTimeout(() => {
          this.router.navigate([`${this.username}/home`]);
        }, 1200);
      },
      (error) => {
        console.log(error);
        // alert("Something went wrong!");
        this._snack.open('Something went wrong!', 'ok', {
          duration: 2000,
        });
      }
    );
  }

  discardChange() {
    this.survey.surveyname = '';
    this.survey.survey_type = '';
    this.survey.message_subject = '';
    this.survey.message_body = '';
    this.survey.survey_dealy = 0;
    this.router.navigate([`${this.username}/home`]);
  }

  moveBack() {
    this.router.navigate([`${this.username}/home`]);
  }

  onHome() {
    this.router.navigate([`${this.username}/home`]);
  }
}
