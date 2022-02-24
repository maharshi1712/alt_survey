import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { SurveyModel } from 'src/app/models/survey.model';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
    toolbarHiddenButtons: [['superscript']],
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

  constructor(private surveyService: SurveyService, private router: Router, private _snack:MatSnackBar) {}
  survey: SurveyModel = new SurveyModel();
  ngOnInit(): void {}
  formSubmit() {
    this.surveyService.addSurvey(this.survey).subscribe(
      (survey: any) => {
        //Success
        console.log(survey);
        //alert("Success");
        Swal.fire('Survey Successfully Modified!', 'success');
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

  moveBack() {
    this.router.navigate(['/home']);
  }
}
