
class WeatherDataFields {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: []
    wind_deg: number;
    wind_speed: number;
}

export class WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: WeatherDataFields;
    hourly: WeatherDataFields[];
    daily: WeatherDataFields[];
}