import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SurveyService } from '../../services/survey.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private surveyService: SurveyService,
    private _snack: MatSnackBar
  ) {}

  user = {
    email: '',
    password: '',
  };

  ngOnInit() {
    localStorage.clear();
  }
  formSubmit() {
    if (this.user.email == '' || this.user.password == '') {
      console.log('Please fill your form.');
      return;
    }
    this.userService.loginUser(this.user).subscribe((response) => {
      let userData: any = response;
      if (userData == null) {
        this.user.email = '';
        this.user.password = '';
        this._snack.open('Enter valid credential!', 'ok', {
          duration: 3000,
        });
        return;
      }
      localStorage.setItem('user_id', userData.id);
      localStorage.setItem('first_name', userData.firstName);
      localStorage.setItem('last_name', userData.lastName);
      if (!response) {
        this.user.email = '';
        this.user.password = '';
        Swal.fire('Enter valid credential');
        console.log('Error');
      } else if (
        userData.password !== this.user.password ||
        userData.email !== this.user.email
      ) {
        console.log(userData);

        this._snack.open('Please Enter Correct Email', 'ok', {
          duration: 2000,
        });
        return;
      } else {
        console.log(userData);
        this.userService.loggedIn = true;

        Swal.fire('Logged in Successfully!');
        setTimeout(() => {
          this.router.navigate([
            `${localStorage
              .getItem('first_name')
              ?.toLocaleLowerCase()}-${localStorage
              .getItem('last_name')
              ?.toLocaleLowerCase()}/home`,
          ]);
        }, 1000);
      }
    });
  }
}
