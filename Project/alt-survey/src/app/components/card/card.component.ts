import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() surveyName:String='';
  @Input() surveyType:String='';
  
 
  constructor() { }

  ngOnInit(): void {
  }

}
