import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SurveyService } from '../../services/survey.service';
import { map } from 'rxjs';
export interface UserData {}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  user = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}
  formSubmit() {
    if (this.user.email == '' || this.user.password == '') {
      console.log('Please fill your form.');
      return;
    }
    this.userService.loginUser(this.user).subscribe((response) => {
      let userData: any = response;
      localStorage.setItem('user_id', userData.id);
      localStorage.setItem('first_name', userData.firstName);
      localStorage.setItem('last_name', userData.lastName);
      if (!response) {
        this.user.email = '';
        this.user.password = '';
        Swal.fire('Enter valid credential');
        console.log('Error');
      } else {
        Swal.fire('Logged in Successfully!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      }
    });
  }
}
