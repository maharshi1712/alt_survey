import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  animations: [
    trigger('myAnimationTriggerForContainer', [
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'translateY(10%)',
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
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  user = {
    email: '',
    password: '',
    confirmpassword: '',
  };

  isLoading = false;
  OtpVerified: any;
  OtpResponse: any;
  OtpEntered: any;

  forgotpasswordForm: FormGroup = new FormGroup({});

  state1 = 'hidden';
  ngOnInit() {
    setTimeout(() => {
      this.state1 = 'shown';
    }, 200);
    this.forgotpasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      otp: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.minLength(8)]),
    });
  }

  public displaySwal() {
    Swal.fire({
      title: 'Password changed successfully!',
      html: 'Success',
      timer: 1200,
      timerProgressBar: true,
    });
  }

  formSubmit() {
    this.user.email = this.forgotpasswordForm.value.email;
    this.user.password = this.forgotpasswordForm.value.password;
    this.user.confirmpassword = this.forgotpasswordForm.value.confirmPassword;
    console.log(this.user);
    if (this.user.email == '' || this.user.password == null) {
      this._snack.open('Email or Password Can not be empty', 'ok', {
        duration: 2000,
      });
      return;
    }

    if (this.user.password != this.user.confirmpassword) {
      this._snack.open('Passsword and Confirm Password do not match', 'ok', {
        duration: 2000,
      });
      return;
    }

    //Changing password through UserService

    this.userService.forgotPassword(this.user).subscribe(
      (data: any) => {
        this.displaySwal();
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

  onVerifyEmail() {
    this.isLoading = true;
    if (this.forgotpasswordForm.value.email == null) {
      this._snack.open('Email cannot be empty!', 'ok', {
        duration: 2000,
      });
      return;
    }

    this.userService
      .verifyForgotPasswordOtp(this.forgotpasswordForm.value.email)
      .subscribe(
        (respone) => {
          this.isLoading = false;
          //console.log('NOT ERROR  :  ' + respone);

          if (respone.status == 500) {
            this._snack.open('User not found with this email!', 'ok', {
              duration: 2000,
            });
          } else if (respone.status == 200) {
            Swal.fire('Otp sent', 'Please verify OTP');
            this.OtpResponse = respone.body;
          }
        },
        (error) => {
          console.log('ERROR   :    ' + error);
        }
      );
  }

  onVerifyOtp() {
    if (this.forgotpasswordForm.value.otp != this.OtpResponse) {
      this._snack.open('Enter Correct Otp', 'ok', {
        duration: 2000,
      });
      return;
    }

    if (this.OtpResponse == this.forgotpasswordForm.value.otp) {
      this.OtpVerified = true;
      Swal.fire('Otp verification Successful', 'Proceed for Password Change');
      console.log('verified');
    }
  }
}
