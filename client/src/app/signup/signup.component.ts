import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  model: any = {
    Firstname: null,
    Lastname: null,
    Email: null,
    Password: null,
  };

  avatar: string | undefined;
  // @ViewChild('confirmPassword', { static: false })
  // confirmPassword!: ElementRef;

  constructor(private router: Router, private UserService: UserService) {}
  emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  ngOnInit(): void {}
  clear(): void {
    this.model = '';
    // this.model.Lastname="",
    // this.model.Email="",
    // this.model.Password="";
  }
  OnSubmit(): void {
    this.UserService.signup(
      this.model.Firstname,
      this.model.Lastname,
      this.model.Email,
      this.model.Password
    ).subscribe({
      next: (data) => {
        // console.log(data);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}