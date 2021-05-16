import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = '';
@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityWeather(cityName:string) {
    return this.http.get('http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + cityName);
  }

  getByCoords(lat, lng){
    return this.http.get('http://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + lat + ', ' + lng);
  }
}
