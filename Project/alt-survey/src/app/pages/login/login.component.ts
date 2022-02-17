import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService) { }

  user = {
    email : "",
    password : ""
  }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.user.email == "" || this.user.password == "") {
      console.log("Please fill your form.")
      return;
    }
    this.userService.loginUser(this.user).subscribe(
      response => {
        console.log(response)
      }
    );
  }

}
