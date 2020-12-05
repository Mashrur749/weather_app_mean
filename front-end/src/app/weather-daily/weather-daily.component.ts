import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-daily',
  templateUrl: './weather-daily.component.html',
  styleUrls: ['./weather-daily.component.css']
})
export class WeatherDailyComponent implements OnInit {

  @Input() dailyWeather;

  getDate(dt){
    let dateString: string;
    let dateFull = new Date(dt*1000);
    
    const nth = function(date) {
      if (date > 3 && date < 21) return 'th';
      switch (date % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    dateString = `${dateFull.getDate()}, ${month[dateFull.getMonth()]} ${dateFull.getDate()}${nth(dateFull.getDate())}` 
    console.log(dateFull)
    return dateString;
  }

  getIcon(weather){
    return "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
  }

  constructor() { }

  ngOnInit(): void {
    console.log("dailyWeather: ", this.dailyWeather)
  }

}
