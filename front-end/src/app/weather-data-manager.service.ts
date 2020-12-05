import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { WeatherData } from './WeatherData'

@Injectable({
  providedIn: 'root'
})
export class WeatherDataManagerService {

  constructor(private http: HttpClient) {}

  getWeatherData(lon:number, lat:number): Observable<WeatherData[]>{
    return this.http.get<WeatherData[]>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=30a04503a686e30279885496d9b6e2d0`)
  }

}
