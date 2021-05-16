import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BikesService } from '../services/bikes.service';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  search: FormGroup;
  shelters: any = [];
  feedbackMessage: string;
  submitted = false;
  sliderElementProps: any = [];
  tenShelters: any = [];
  start: number = 0;
  end: number = 10;
  searchManual: string;
  currentPosition: any;
  coords: any = [];
  recentCities: any = [];
  recentCitiesReload = [];
  localSearchHistory = [];
  favourites = [];
  isEmpty: any;
  isRecentCitiesEmpty: any;
  coordsEmpty: any;
  constructor(private formBuilder: FormBuilder, private bikesService: BikesService, private localService: LocalService, private router: Router, public translate: TranslateService) { }

  ngOnInit() {

    this.search = this.formBuilder.group({
      city_name: ['', Validators.required]
    });

    if (this.localService.getGPSPreference() === 'enabled') {
      this.manualSearch();
      this.getLocation();
    } else if (this.localService.getSearchPreference() === 'enabled') {
      this.manualSearch();
    } else {
      this.displayDefault();
    }
    let lang = this.localService.getLanguagePref();
    if (lang === 'en') {
      this.translate.use('en');
    } else if (lang === 'es') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }
    this.localSearchHistory = JSON.parse(this.localService.getSearchHistory());
    setInterval(() => {
      if (this.localSearchHistory != undefined || this.localService.getSearchHistory() != null) {
        this.localSearchHistory = JSON.parse(this.localService.getSearchHistory());
        this.recentCitiesReload = JSON.parse(this.localService.getSearchHistory());
        if (this.recentCitiesReload != null) {
          this.isEmpty = this.recentCitiesReload.length;
        }
      }
    }, 100);
  }

  searchByCity() {
    if (this.search.value.city_name === '') {
      this.feedbackMessage = 'Please Enter A City';
    } else {
      this.bikesService.getBikesByCity(this.search.value.city_name).subscribe((response) => {
        this.submitted = true;
        this.shelters = response;
        this.feedbackMessage = '';
        this.previousTen();
        this.coords = [];
        (<HTMLElement>document.querySelector('.recentDiv')).style.display = 'none';
        this.recentCities.push(this.search.value.city_name);
        if (this.recentCities.length === 5) {
          this.recentCities.shift();
        }
        if (this.localService.getSearchHistory() != null) {
          this.recentCitiesReload.push(this.search.value.city_name);
          this.isEmpty = this.recentCities.length;
          if (this.recentCitiesReload.length === 5) {
            this.recentCitiesReload.shift();
          }
        } else {
          this.isRecentCitiesEmpty = this.recentCities.length
        }
        let arrayLength = this.shelters.length - 1;
        if (this.localService.getGPSPreference() === 'enabled') {
          for (let i = 0; i <= arrayLength; i++) {
            if (this.localService.getSpeedPref() === 'km') {
              let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng)) + 'km';
              this.coords.push(result);
            } else if (this.localService.getSpeedPref() === 'm') {
              let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng));
              let converted = result / 3.6;
              let displaySpeed = Math.round(converted) + 'm';
              this.coords.push(displaySpeed);
            } else {
              let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng)) + 'km';
              this.coords.push(result);
            }
          }
        } else {
          this.coordsEmpty = 0;
        }
        document.querySelector('.shelterWrapper').className = "shelterWrapper active";
        this.search.reset();
      }, error => {
        this.feedbackMessage = 'Sorry This City Is Not Available';
      });
    }
  }
  previousTen() {
    if (this.start === 0 && this.end === 10) {
      this.tenShelters = this.shelters.slice(0, 10);
    } else {
      this.start -= 10;
      this.end -= 10;
      this.tenShelters = this.shelters.slice(this.start, this.end);
    }
    console.log(this.start + '  ' + this.end);
    return this.tenShelters;
  }
  nextTen() {
    this.start += 10;
    this.end += 10;
    this.tenShelters = this.shelters.slice(this.start, this.end);
    console.log(this.start + '  ' + this.end);
    return this.tenShelters;
  }

  manualSearch() {
    this.searchManual = 'enabled';
    this.localService.storeSearchPreference(this.searchManual);
    (<HTMLElement>document.querySelector('.one')).style.display = 'none';
    (<HTMLElement>document.querySelector('.two')).style.display = 'block';
  }

  displayDefault() {
    (<HTMLElement>document.querySelector('.one')).style.display = 'block';
    (<HTMLElement>document.querySelector('.two')).style.display = 'none';
  }

  navigateToSettings() {
    this.router.navigateByUrl('/settings');
  }

  navigateToFavourites() {
    this.router.navigateByUrl('/favourites');
  }

  enableGPS() {
    this.localService.storeGPSPreference('enabled');
    this.manualSearch();
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentPosition = [{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }];
    }), { enableHighAccuracy: true };
  }

  clickSearch(cityName) {
    this.bikesService.getBikesByCity(cityName).subscribe((response) => {
      this.submitted = true;
      this.shelters = response;
      this.previousTen();
      this.coords = [];
      document.querySelector('.shelterWrapper').className = "shelterWrapper active";
      (<HTMLElement>document.querySelector('.recentDiv')).style.display = 'none';
      let arrayLength = this.shelters.length - 1;
      if (this.localService.getGPSPreference() === 'enabled') {
        for (let i = 0; i <= arrayLength; i++) {
          if (this.localService.getSpeedPref() === 'km') {
            let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng)) + ' km';
            this.coords.push(result);
          } else if (this.localService.getSpeedPref() === 'm') {
            let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng));
            let converted = result / 1.609;
            let displaySpeed = Math.round(converted) + ' m';
            this.coords.push(displaySpeed);
          } else {
            let result = Math.round(this.calcDist(this.currentPosition[0].latitude, this.currentPosition[0].longitude, this.shelters[i].position.lat, this.shelters[i].position.lng)) + ' km';
            this.coords.push(result);
          }
        }
      } else {
        this.coordsEmpty = 0;
      }
    });
  }

  /*
  REFERENCES
  HAVSERSINE FORMULA
  https://www.movable-type.co.uk/scripts/latlong.html
  https://stackoverflow.com/questions/365826/calculate-distance-between-20gps-coordinates
  */
  convertDegToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  calcDist(lat1, lng1, lat2, lng2) {
    let radius = 6371;
    let degreeLat = this.convertDegToRadians(lat2 - lat1);
    let degreeLon = this.convertDegToRadians(lng2 - lng1);

    lat1 = this.convertDegToRadians(lat1);
    lat2 = this.convertDegToRadians(lat2);

    var a = Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) +
      Math.sin(degreeLon / 2) * Math.sin(degreeLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }

  /*REFERENCE ENDS*/

  ngOnDestroy() {
    this.localService.storeSearchHistory(JSON.stringify(this.recentCities));
  }

  addToFav(shelterName, status, num) {
    let className: string = '.a' + num;
    let olderFavs = JSON.parse(this.localService.getFavourites());
    if (olderFavs != null) {
      let dataOne = {
        "name": shelterName,
        "status": status
      }
      olderFavs.push(dataOne);
      this.localService.storeFavourites(JSON.stringify(olderFavs));
      (<HTMLElement>document.querySelector(className)).style.color = '#3180be';
    } else {
      let dataTwo = {
        "name": shelterName,
        "status": status
      }
      this.favourites.push(dataTwo);
      this.localService.storeFavourites(JSON.stringify(this.favourites));
      (<HTMLElement>document.querySelector(className)).style.color = '#3180be';
    }
  }
  userDistance(distance) {
    this.localService.storeDistanceFromUser(distance);
  }
}
