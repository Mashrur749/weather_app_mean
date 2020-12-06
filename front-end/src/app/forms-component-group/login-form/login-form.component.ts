import { Component, OnInit } from '@angular/core';
import {User} from '../../User';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  user: User;
  passwordRequiredError:boolean;
  warning: any;

  constructor(private auth:AuthService, private router:Router) { }
  
  
  onSubmit(f:NgForm){
    if(f.value.password.length < 1){
      this.passwordRequiredError = true;
    }else{
      this.passwordRequiredError = false;
    }   
    
    this.auth.login(this.user).subscribe(
      (success) => {
        
        console.log("login subscribe")
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token', success.token);
        // redirect to the "vehicles" route
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err)
        this.warning = err.error.message;
      }
    );

  }

  
  ngOnInit(): void {
    this.passwordRequiredError = false;
    this.user={
      userName: "",
      password: "",
      cityId: ""
    }
  }
}

