import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  loggedIn: boolean = false;
  //Add user through frontEnd;
  public addUser(user: any) {
    return this.http.post(`${baseUrl}user/`, user);
  }

  public verifySignUpUser(email: any) {
    return this.http.get(`${baseUrl}user/signup/sendotp/` + email, {
      observe: 'response',
    });
  }

  public loginUser(user: any) {
    return this.http.post(`${baseUrl}user/login`, user);
  }

  public verifyForgotPasswordOtp(email: any) {
    return this.http.get(`${baseUrl}user/forgot-password/sendotp/` + email, {
      observe: 'response',
    });
  }

  public forgotPassword(user: any) {
    return this.http.post(`${baseUrl}user/forgot-password`, user);
  }
}
