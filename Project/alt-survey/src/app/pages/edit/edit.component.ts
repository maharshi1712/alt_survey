import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyModel } from '../../models/survey.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snack: MatSnackBar,
  ) {}
  survey_id: any;
  survey: SurveyModel = new SurveyModel();

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.survey_id = params.get('id');
    });
    this.surveyService.viewSurvey(this.survey_id).subscribe((response) => {
      let res: any = response;
      this.survey.setValuesEdit(res);
      console.log(this.survey);
      
    });
  }

  onSubmitSurvey() {
    
    this.surveyService.updateSurvey(this.survey, this.survey_id).subscribe(
      (survey: any) => {
        //Success
        console.log(survey);
        //alert("Success");
        Swal.fire(
          'Survey Successfully Modified!',
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
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

  onDeleteSurvey() {}
}
