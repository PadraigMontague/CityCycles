import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = '';
@Injectable({
  providedIn: 'root'
})
export class BikesService {
  constructor(private http: HttpClient) { }

  getBikesByCity(cityName: string) {
    return this.http.get('https://api.jcdecaux.com/vls/v1/stations?contract=' + cityName + '&apiKey=' + apiKey);
  }
  getAllCities() {
    return this.http.get('https://api.jcdecaux.com/vls/v1/contracts?apiKey=' + apiKey);
  }
  getShelterDetails(id: number, cityName: string) {
    return this.http.get('https://api.jcdecaux.com/vls/v1/stations/' + id + '?contract=' + cityName + '&apiKey=' + apiKey);
  }
}
