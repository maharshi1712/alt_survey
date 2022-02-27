import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { SurveyService } from 'src/app/services/survey.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateX(10%)',
        })
      ),
      state(
        'shown',
        style({
          opacity: 1,
          transform: 'translateX(0%)',
        })
      ),
      transition('hidden => shown', [animate('0.5s')]),
    ]),
  ],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snack: MatSnackBar,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
  };

  isLoading = false;
  OtpEntered: any;
  OtpResponse: any;
  OtpVerified = false;

  state1 = 'hidden';

  signupForm: FormGroup = new FormGroup({});

  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      otp: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.minLength(8)]),
    });
  }

  formSubmit() {
    this.user.firstName = this.signupForm.value.firstname;
    this.user.lastName = this.signupForm.value.lastname;
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.confirmpassword = this.signupForm.value.confirmPassword;
    console.log(this.user);
    if (this.user.email == '' || this.user.email == null) {
      this._snack.open('Please Enter Correct Email', 'ok', {
        duration: 2000,
      });
      return;
    }
    if (
      this.user.firstName == '' ||
      this.user.lastName == null ||
      this.user.firstName == '' ||
      this.user.lastName == null
    ) {
      this._snack.open('Please Fill all the fields properly', 'ok', {
        duration: 2000,
      });
      return;
    }
    if (this.user.password != this.user.confirmpassword) {
      this._snack.open('Password and Confirm password donot match', 'ok', {
        duration: 2000,
      });
      return;
    }

    //add user from UserService;

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire(
          'Successfully Registered!',
          'User is Registered with userid ' + data.id,
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      (error) => {
        console.log(error);
        // alert("Something went wrong!");
        this._snack.open('Something went wrong!', 'validate', {
          duration: 2000,
        });
      }
    );
  }

  onVerifyUser() {
    this.isLoading = true;
    if (this.signupForm.value.email == null) {
      this._snack.open('Email cannot be empty!', 'ok', {
        duration: 2000,
      });
      return;
    }

    this.userService.verifySignUpUser(this.signupForm.value.email).subscribe(
      (respone) => {
        this.isLoading = false;
        if (respone.status == 208) {
          // this._snack.open('User already Exists!', 'ok', {
          //   duration: 2000,
          // });
          Swal.fire({
            text: 'User Already Exists !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login',
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('You will be redirect to Login');
              setTimeout(() => {
                this.router.navigate([`login`]);
              }, 1500);
            }
          });
        } else if (respone.status == 200) {
          Swal.fire('Otp sent', 'Please verify OTP');
          console.log('NOT ERROR  :  ' + respone.body);
          this.OtpResponse = respone.body;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onVerifyOtp() {
    if (this.signupForm.value.otp != this.OtpResponse) {
      this._snack.open('Enter Correct Otp', 'ok', {
        duration: 2000,
      });
      return;
    }

    if (this.OtpResponse == this.signupForm.value.otp) {
      this.OtpVerified = true;
      Swal.fire('Otp verification Successful', 'Proceed to Register');
    }
  }
}
