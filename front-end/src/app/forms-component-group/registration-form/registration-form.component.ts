import { Component, OnInit } from '@angular/core';
import {User} from '../../User';
import { NgForm } from "@angular/forms";
import { AuthService } from '../../auth.service';
import { Router } from "@angular/router"

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
  warning: any;

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

    if(this.passwordNotMatchError === false && this.user.userName.length > 0){
      f.value.password2 = this.passwordMatch;
      //send api request
      this.auth.register(f.value).subscribe(
        (success) => {
          // redirect to the "vehicles" route
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err.error.message)
          this.warning = err.error.message;
        }
      )
      
      //if username exists duplicate user = true
    }
    
  }
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.passwordNotMatchError = false;
    this.duplicateUserError = false;
    this.passwordRequiredError = false;

    this.user={
      userName: "",
      password: "",
      cityId: ""
    }
  }

}
