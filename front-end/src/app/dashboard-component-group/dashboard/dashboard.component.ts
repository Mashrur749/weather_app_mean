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
  currCity = this.cities[25];

  
  setCity(e){
    this.currCity = this.getCityById(e.target.dataset.cityId);
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);
    //api call to change the user city
    console.log(this.auth.readToken())
    this.auth.updateUserCity(this.auth.readToken()._id, this.auth.readToken().cityId);
  }

  getCityById(id){
    let foundCity;
    this.cities.forEach(e => {
      if(e.id == id){
        foundCity = e;
      }
    })
    return foundCity;
  }

  constructor(private data: WeatherDataManagerService, private auth: AuthService) {
  }
  
  ngOnInit(): void {
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);
  }
  ngOnDestroy(){
    this.weatherDataSub.unsubscribe();
  }
}
