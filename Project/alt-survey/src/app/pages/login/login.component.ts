import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SurveyService } from '../../services/survey.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(-10%)',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateY(0%)',
        })
      ),
      transition('hidden => shown', [animate('0.5s')]),
    ]),
  ],
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
  state1 = 'hidden';

  loginForm: FormGroup = new FormGroup({});

  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
    localStorage.clear();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  formSubmit() {
    this.loginForm.get('email')?.errors;
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
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
        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('first_name', userData.firstName);
        localStorage.setItem('last_name', userData.lastName);

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
