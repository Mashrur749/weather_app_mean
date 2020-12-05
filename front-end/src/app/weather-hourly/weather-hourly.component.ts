import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-hourly',
  templateUrl: './weather-hourly.component.html',
  styleUrls: ['./weather-hourly.component.css']
})
export class WeatherHourlyComponent implements OnInit {

  @Input() hourlyWeather;
  dateString: string;
  getDate(dt){
    return new Date(dt*1000).toLocaleTimeString();
  }

  getIcon(weather){
    return "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
  }

  constructor() { }

  ngOnInit(): void {
  }

}
