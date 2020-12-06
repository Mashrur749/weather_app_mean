import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';

let userURL = "http://localhost:8080/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): any{
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use helper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  updateUserCity(userId:string, cityId:string): Observable<any>{
    return this.http.put<any>(`${userURL}/${userId}`, {cityId: cityId});
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${userURL}/login`, user);
  }

  register(user:User): Observable<any> {
    return this.http.post<any>(`${userURL}/register`, user);
  }

}