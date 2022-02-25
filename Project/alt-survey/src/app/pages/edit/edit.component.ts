import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
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
  survey_id: any;
  survey: SurveyModel = new SurveyModel();

  created_By: any;
  created_Date: any;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.survey_id = params.get('id');
    });
    this.surveyService.viewSurvey(this.survey_id).subscribe((response) => {
      let res: any = response;
      this.created_By = res.createdBy;
      this.created_Date = res.createdDate;
      console.log(res.createdDate);
      console.log(this.created_Date);
      this.survey.setValuesEdit(res);
      console.log(this.survey);
    });
  }

  prac: any;

  onSubmitSurvey() {
    this.survey.createdBy = this.created_By;
    this.survey.createdDate = this.created_Date;

    console.log(this.survey.createdBy);
    console.log(this.survey.createdDate);

    this.surveyService.updateSurvey(this.survey, this.survey_id).subscribe(
      (survey: any) => {
        console.log(survey);
        //alert("Success");
        Swal.fire('Survey Successfully Modified!', 'success');
        setTimeout(() => {
          this.router.navigate([
            `${localStorage
              .getItem('first_name')
              ?.toLocaleLowerCase()}-${localStorage
              .getItem('last_name')
              ?.toLocaleLowerCase()}/home`,
          ]);
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
    if(this.survey.createdDate!=this.survey.modifiedBy)
    {
      Swal.fire("You are not authorized person to delete", "you can only modify it");
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
          }
        );
        Swal.fire('Deleted!', 'Your Survey has been deleted.', 'success');
        setTimeout(() => {
          this.router.navigate([':user/home']);
        }, 1500);
      }
    });
  }

  moveBack() {
    this.router.navigate([':user/home']);
  }
}
