import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.css']
})
export class WeatherCurrentComponent implements OnInit {

  @Input() currWeather;
  weatherIcon:string;
  constructor() { }

  ngOnInit(): void {
    this.weatherIcon = "http://openweathermap.org/img/wn/" + this.currWeather.weather[0].icon + "@2x.png"
  }

}
