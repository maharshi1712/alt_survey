import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(private userService: UserService, private _snack: MatSnackBar, private router: Router) {}

  public user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  };

  OtpEntered: any;
  OtpResponse: any;
  OtpVerified = false;

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.email == '' || this.user.email == null ||this.user.password!=this.user.confirmpassword) {
      this._snack.open('Password and Confirm password donot match', 'ok', {
        duration: 2000,
      });
      return;
    }

    //add user from UserService;

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //Success
        console.log(data);
        //alert("Success");
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
    if(this.user.email==null)
    {
      this._snack.open('Email cannot be empty!', 'ok', {
        duration: 2000,
      });
      return;
    }
    
    this.userService.verifySignUpUser(this.user.email).subscribe(
      (respone) => {
        this.isLoading = false;
        console.log('NOT ERROR  :  ' + respone);

        if(respone.status == 208) {
          this._snack.open('User already found with tis email!', 'ok', {
            duration: 2000,
          });
        }
        else if (respone.status == 200){
          this.OtpResponse = respone.body;
        }
      },
      (error) => {
        console.log('ERROR   :    ' + error);
      }
    );
  }

  onVerifyOtp() {
    if (this.OtpResponse === this.OtpEntered) {
      this.OtpVerified = true;
      console.log('verified');
    }
  }
}
