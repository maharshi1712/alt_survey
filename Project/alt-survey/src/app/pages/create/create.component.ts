import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

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
  }
  formSubmit(){
    alert('Survey Details saved successfully')
    console.log(this.survey);
  }
}
