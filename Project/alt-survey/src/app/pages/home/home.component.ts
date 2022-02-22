import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  selected = 'option1';
  @Input() username: String = 'sample';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onCreateNewSurvey() {
    this.router.navigate(['/create']);
  }
}
