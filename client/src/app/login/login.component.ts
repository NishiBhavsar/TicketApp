import { Component, OnInit } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: any={
    Email: null,
    Password: null,
  };
  avatar: string | undefined;
  UserLoginForm: FormGroup;
  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  OnSubmit() {
    console.log('is it here?');
    this.UserService.signin(
      this.model.Email,
      this.model.Password
    ).subscribe({
      next: (data) => {
        console.log('great success!!', data);
        window.localStorage.setItem("token", data.token)
       
        window.localStorage.setItem('user', JSON.stringify(data.user));
        if (window.localStorage.getItem('token')) {
          this.router.navigate(['/dashboard'])
        } else {
          this.router.navigate([''])
        }
      },
      error: (error) => {
        console.log("Faile to connect :(");
        
        console.log(this.model);
      },
    });
  }
}