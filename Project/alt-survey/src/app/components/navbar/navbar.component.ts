import { Component, Input, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { SignupComponent } from 'src/app/pages/signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() navItem1: String = '';
  @Input() navItem2: String = '';
  constructor(private route: Router) {}
  
  
  
  ngOnInit(){
    
  }
}
