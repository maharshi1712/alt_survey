import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})



export class CreateComponent implements OnInit {
  isActive = false;
  
  htmlContent = '';

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
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor() { }
  public survey={
    surveyName :'',
    surveyType:'',
    subject:'',
    content:'',
    Rquery:'',
    delay:'',
    isActive:''
  }
  ngOnInit(): void {
    //this.isActive=true;
  }
  formSubmit(){
    alert('Survey Details saved successfully')
    console.log(this.survey);
  }
}
