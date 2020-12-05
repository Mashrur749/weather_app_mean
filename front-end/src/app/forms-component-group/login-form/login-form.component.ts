import { Component, OnInit } from '@angular/core';
import {User} from '../../User';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  user: User;
  passwordRequiredError:boolean;
  
  onSubmit(f:NgForm){
    if(f.value.password.length < 1){
      this.passwordRequiredError = true;
    }else{
      this.passwordRequiredError = false;
    }
  }

  constructor() { }
  ngOnInit(): void {
    this.passwordRequiredError = false;
    this.user={
      username: "",
      password: "",
      cityId: ""
    }
  }
}
