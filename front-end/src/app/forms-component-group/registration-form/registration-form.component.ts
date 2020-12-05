import { Component, OnInit } from '@angular/core';
import {User} from '../../User';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  user: User;
  passwordMatch: string;
  passwordNotMatchError: boolean;
  duplicateUserError: boolean;
  passwordRequiredError: boolean;

  onSubmit(f: NgForm): void {
    if(f.value.password.length < 1){
      this.passwordRequiredError = true;
    }else{
      this.passwordRequiredError = false;
    }

    if(f.value.password !== f.value.passwordMatch){
      this.passwordNotMatchError = true;
    } else {
      this.passwordNotMatchError = false;
    }

    if(this.passwordNotMatchError === false && this.user.username.length > 0){
      //send api request
      //if username exists duplicate user = true
    }
    
    console.log(f.value);
  }
  constructor() { }

  ngOnInit(): void {
    this.passwordNotMatchError = false;
    this.duplicateUserError = false;
    this.passwordRequiredError = false;

    this.user={
      username: "",
      password: "",
      cityId: ""
    }
  }

}
