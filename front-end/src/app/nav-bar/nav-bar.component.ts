import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  @Input() isLoggedIn:boolean;
  userName:string = "fixMe";

  toggleLoggedIn(e){
    this.isLoggedIn = !this.isLoggedIn;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
