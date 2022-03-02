import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateX(10%)',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateX(0%)',
        })
      ),
      transition('hidden => shown', [animate('0.4s')]),
    ]),
  ],
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
    private router: Router,
    private _snack: MatSnackBar
  ) {}

  state1 = 'hidden';
  username: any = `${localStorage
    .getItem('first_name')
    ?.toLocaleLowerCase()}-${localStorage
    .getItem('last_name')
    ?.toLocaleLowerCase()}`;
  survey_id: any;
  survey: SurveyModel = new SurveyModel();
  created_By: any;
  created_Date: any;
  editForm: FormGroup = new FormGroup({});
  load = false;

  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
    this.route.paramMap.subscribe((params) => {
      this.survey_id = params.get('id');
    });

    this.surveyService.viewSurvey(this.survey_id).subscribe(
      (response) => {
        let res: any = response;
        this.created_By = res.createdBy;
        this.created_Date = res.createdDate;
        this.survey.setValuesEdit(res);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.editForm = new FormGroup({
          surveyname: new FormControl(
            this.survey.surveyname,
            Validators.required
          ),
          survey_type: new FormControl(
            this.survey.survey_type,
            Validators.required
          ),
          message_subject: new FormControl(
            this.survey.message_subject,
            Validators.required
          ),
          message_body: new FormControl(
            this.survey.message_body,
            Validators.required
          ),
          survey_dealy: new FormControl(this.survey.survey_dealy, [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
            Validators.min(0),
          ]),
        });
        this.load = true;
      }
    );
  }

  prac: any;

  onSubmitSurvey() {
    this.survey.createdBy = this.created_By;
    this.survey.createdDate = this.created_Date;
    console.log(this.editForm.value.surveyname);
    this.survey.surveyname = this.editForm.value.surveyname;
    this.survey.survey_type = this.editForm.value.survey_type;
    this.survey.message_body = this.editForm.value.message_body;
    this.survey.message_subject = this.editForm.value.message_subject;
    this.survey.survey_dealy = this.editForm.value.survey_dealy;
    // console.log(this.survey.createdBy);
    // console.log(this.survey.createdDate);

    this.surveyService.updateSurvey(this.survey, this.survey_id).subscribe(
      (survey: any) => {
        console.log(survey);
        Swal.fire('Survey Successfully Modified!', 'SUCCESS');
        setTimeout(() => {
          this.router.navigate([`${this.username}/home`]);
        }, 1500);
      },
      (error) => {
        console.log(error);
        this._snack.open('Something went wrong!', 'ok', {
          duration: 2000,
        });
      }
    );
  }

  onDeleteSurvey() {
    if (this.survey.createdBy != this.survey.modifiedBy) {
      Swal.fire(
        'You are not authorized person to delete',
        'you can only modify it'
      );
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.surveyService
          .deleteSurvey(this.survey_id)
          .subscribe((response) => {
            console.log(response);
          });
        Swal.fire('Deleted!', 'Your Survey has been deleted.', 'success');
        setTimeout(() => {
          this.router.navigate([`${this.username}/home`]);
        }, 1500);
      }
    });
  }

  moveBack() {
    this.router.navigate([`${this.username}/view/${this.survey_id}`]);
  }

  onHome() {
    this.router.navigate([`${this.username}/home`]);
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
