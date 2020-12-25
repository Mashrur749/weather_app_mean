import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, Event, NavigationStart } from "@angular/router"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  isLoggedIn:boolean;
  userName:string;
  public token: any;

  constructor(private auth: AuthService, private router: Router) {
  }

  toggleLoggedIn(e){
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  logout(e){
    this.auth.logout();
    this.isLoggedIn = this.auth.isAuthenticated();
    console.log(this.isLoggedIn)
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.isLoggedIn = this.auth.isAuthenticated();
    if(this.isLoggedIn){
      this.userName = this.auth.readToken().userName;
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        console.log("Route event triggered")
        this.token = this.auth.readToken();

        if(this.isLoggedIn){          
          this.userName = this.auth.readToken().userName
        }else{
          this.userName = ""
        }

      }
    });
  }

}
