import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherDataManagerService } from "../../weather-data-manager.service"
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
  currCity = this.cities[0];

  setCity(e){
    this.currCity = e.target.dataset;
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);
  }

  constructor(private data: WeatherDataManagerService) {
  }
  
  ngOnInit(): void {
    this.weatherDataSub = this.data.getWeatherData(this.currCity.lon, this.currCity.lat).subscribe(data => this.weatherData = data);
  }
  ngOnDestroy(){
    this.weatherDataSub.unsubscribe();
  }
}
