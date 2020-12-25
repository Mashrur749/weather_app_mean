import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataManagerService } from "../../weather-data-manager.service"
import {AuthService} from '../../auth.service'
import cityData from "../../data/cities.json"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  weatherData;
  private weatherDataSub; 
  cities = cityData;
  currCity = this.getCityById(this.auth.readToken().cityId);

  
  setCity(e){
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);
    //api call to change the user city
    this.currCity = this.cities[e.target.dataset.cityId-1];
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);

    this.auth.updateUserCity(this.auth.readToken()._id, e.target.dataset.cityId)
      .subscribe(
        (data)=> {
          // store the returned token in local storage as 'access_token'
          localStorage.setItem('access_token', data.token);
          console.log(this.auth.readToken())
        },
      );
  }

  getCityById(id){
    let foundCity;
    this.cities.forEach((e,idx) => {
      if(e.id == id){
        foundCity = e;
        console.log("found city", foundCity)
      }
    })
    return foundCity;
  }

  constructor(private data: WeatherDataManagerService, private auth: AuthService) {
  }
  
  ngOnInit(): void {
    this.weatherDataSub = 
      this.data.getWeatherData(this.currCity.lon, this.currCity.lat)
        .subscribe(data => this.weatherData = data);
    
    this.currCity = this.getCityById(this.auth.readToken().cityId);
  }
  ngOnDestroy(){
    this.weatherDataSub.unsubscribe();
  }
}
