import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  user = {
    email: '',
    password: '',
    confirmpassword: ''
  };

  isLoading = false;
  OtpVerified: any;
  OtpResponse: any;
  OtpEntered: any;


  constructor(private userService: UserService, private _snack: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

public displaySwal(){
  Swal.fire({
    title: 'Password changed successfully!',
    html: 'Success',
    timer: 1500,
    timerProgressBar: true,
    })
    
}

  formSubmit() {
    console.log(this.user);
    if (this.user.email == '' || this.user.password == null) {
      this._snack.open('Email or Password Can not be empty', 'ok', {
        duration: 2000,
      });
      return;
    }

    if(this.user.password!=this.user.confirmpassword)
    {
      this._snack.open('Passsword and Confirm Password do not match', 'ok',{
        duration:2000
      });
      return;
    }

    //Changing password through UserService

    this.userService.forgotPassword(this.user).subscribe(
      (data: any) => {
        //Success
        console.log(data);
        //alert("Success");
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
    if (this.user.email == null) {
      this._snack.open('Email cannot be empty!', 'ok', {
        duration: 2000,
      });
      return;
    }

    this.userService.verifyForgotPasswordOtp(this.user.email).subscribe(
      (respone) => {
        this.isLoading = false;
        //console.log('NOT ERROR  :  ' + respone);

        if (respone.status == 500) {
          this._snack.open('User not found with this email!', 'ok', {
            duration: 2000,
          });
        } else if (respone.status == 200) {
          this.OtpResponse = respone.body;
        }
      },
      (error) => {
        console.log('ERROR   :    ' + error);
      }
    );
  }

  onVerifyOtp() {
    if(this.OtpEntered!=this.OtpResponse)
    {
      this._snack.open('Enter Correct Otp', 'ok',{
        duration:2000,
      });
      return;
    }

    if (this.OtpResponse == this.OtpEntered) {
      this.OtpVerified = true;
      Swal.fire('Otp verification Successful','Proceed for Password Change')
      console.log('verified');
    }
  }
}
