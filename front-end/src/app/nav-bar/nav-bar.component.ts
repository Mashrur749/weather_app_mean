import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  @Input() isLoggedIn:boolean;
  userName:string;

  constructor(private auth: AuthService) {
  }

  toggleLoggedIn(e){
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  logOut(e){

  }


  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated();
    this.userName = this.auth.readToken().userName;
  }

}
