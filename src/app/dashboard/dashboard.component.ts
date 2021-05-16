import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  position;
  positionTwo;
  positionOne;
  status = false;
  seconds = 0;
  minute = 0;
  hour = 0;
  interval: any;
  totalTime: any;
  distanceTraveled;
  meters;
  speed;
  minsToHour;
  secondsToHours;
  default;
  caloriesBurned;

  constructor(private localService: LocalService, public translate: TranslateService) { }
  ngOnInit() {
    let lang = this.localService.getLanguagePref();
    if (lang === 'en') {
      this.translate.use('en');
    } else if (lang === 'es') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }

    if (this.localService.getSpeedPref() === 'km') {
      this.default = 'km/h';
    } else if (this.localService.getSpeedPref() === 'm') {
      this.default = 'mph';
    } else {
      this.default = 'km/h';
    }
  }
  startTime() {
    this.interval = setInterval(() => {
      this.seconds += 1;
      if (this.minute === 59) {
        this.hour += 1;
        this.minute = 0;
        this.seconds = 0;
        console.log(this.minute + ' Minutes');
      }
      if (this.seconds === 59) {
        this.seconds = 0;
        this.minute += 1;
        console.log(this.minute + ' Minutes');
      }
      this.totalTime = this.hoursTemp() + ' : ' + this.minutesTemp() + ' : ' + this.secondsTemp();
      (<HTMLElement>document.querySelector('.totalTime')).innerHTML = '' + this.totalTime + '';
    }, 1000);
  }

  stopTime() {
    this.totalTime = this.hour + ' : ' + this.minute + ' : ' + this.seconds
    clearInterval(this.interval);
    this.localService.storeTripDuration(this.totalTime);
    let disTime = this.localService.getTripDuration();
    console.log(this.localService.getTripDuration());
    (<HTMLElement>document.querySelector('.duration')).innerHTML = disTime + ' mins';
  }
  startTracking() {
    (<HTMLElement>document.querySelector('.position_btn_start')).style.display = 'none';
    (<HTMLElement>document.querySelector('.position_btn_stop')).style.display = 'block';
    this.position = navigator.geolocation.getCurrentPosition((position) => {
      this.positionOne = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    });
    this.startTime();
  }

  stopTracking() {
    (<HTMLElement>document.querySelector('.position_btn_stop')).style.display = "none";
    (<HTMLElement>document.querySelector('.position_btn_start')).style.display = "block";
    navigator.geolocation.getCurrentPosition((position) => {
      this.positionTwo = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      let result = this.calcDist(this.positionOne.latitude, this.positionOne.longitude, this.positionTwo.latitude, this.positionTwo.longitude);
      if (result < 1) {
        this.localService.storeDistanceTraveled(Math.round(result * 100) / 100);
        (<HTMLElement>document.querySelector('.distance')).innerHTML = this.localService.getDistanceTraveled() + ' m';
      } else {
        this.localService.storeDistanceTraveled(Math.round(result * 100) / 100);
        (<HTMLElement>document.querySelector('.distance')).innerHTML = this.localService.getDistanceTraveled() + ' km';
      }
      this.status = true;
      if (this.localService.getSpeedPref() === 'km') {
        let speedResult = this.calculateSpeed();
        this.localService.storeSpeed(Math.round(speedResult));
        document.querySelector('.speed_avg').innerHTML = this.localService.getSpeed() + ' km/h';
        document.querySelector('.number').innerHTML = this.localService.getSpeed();
        this.stopTime();
      } else if (this.localService.getSpeedPref() === 'm') {
        let speedResult = this.calculateSpeed();
        let converted = speedResult / 1.609;
        this.localService.storeSpeed(Math.round(converted));
        document.querySelector('.speed_avg').innerHTML = this.localService.getSpeed() + ' mph';
        document.querySelector('.number').innerHTML = this.localService.getSpeed();
        this.stopTime();
      } else {
        let speedResult = this.calculateSpeed();
        this.localService.storeSpeed(Math.round(speedResult));
        document.querySelector('.speed_avg').innerHTML = this.localService.getSpeed() + ' km/h';
        document.querySelector('.number').innerHTML = this.localService.getSpeed();
        this.stopTime();
      }
    });
    let cals = this.calculateCaloriesBurned();
    (<HTMLElement>document.querySelector('.cal')).innerHTML = cals+ ' kcal';
  }

  /*
REFERENCES
HAVERSINE FORMULA
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

  calculateSpeed() {
    if (this.distanceTraveled >= 1 && this.hour >= 1) {
      this.speed = this.distanceTraveled / this.hour;
      return this.speed.toFixed(2);
    } else if (this.distanceTraveled < 1 && this.hour >= 1) {
      this.speed = this.distanceTraveled / this.hour;
      return this.speed.toFixed(2);
    } else if (this.distanceTraveled >= 1 && this.hour < 1) {
      this.minsToHour = this.minute / 60;
      this.speed = this.distanceTraveled / this.minsToHour;
      return this.speed.toFixed(2);
    } else if (this.distanceTraveled < 1 && this.hour < 1 && this.minute > 0) {
      this.minsToHour = this.minute / 60;
      this.speed = this.distanceTraveled / this.minsToHour;
      return this.speed.toFixed(2);
    } else if (this.seconds > 0 && this.distanceTraveled > 0) {
      this.secondsToHours = this.seconds / 3600;
      this.speed = this.distanceTraveled / this.secondsToHours;
      return this.speed;
    } else {
      this.speed = '0';
      return this.speed;
    }
  }
  secondsTemp() {
    if (this.seconds < 10) {
      return '0' + this.seconds;
    } else {
      return this.seconds;
    }
  }
  minutesTemp() {
    if (this.minute < 10) {
      return '0' + this.minute;
    } else {
      return this.minute;
    }
  }
  hoursTemp() {
    if (this.hour < 10) {
      return '0' + this.hour;
    } else {
      return this.hour;
    }
  }

  /** 
   * Formula to calculate calories burned sourced from:
   * https://www.verywellfit.com/hom-many-calories-you-burn-during-exercise-4111064
  */
  calculateCaloriesBurned() {
    let MET = 4;
    let weight = 62;
    let time: number;
    if (this.hour > 0 && this.minute < 1) {
      time = this.hour * 60;
      return this.caloriesBurned = time * (MET * 3.5 * weight) / 200;
    } else if (this.hour > 0 && this.minute > 0) {
      let hours = this.hour * 60;
      time = hours + this.minute;
      return this.caloriesBurned = time * (MET * 3.5 * weight) / 200;
    } else if (this.hour <= 0 && this.minute > 0) {
      time = this.minute;
      return this.caloriesBurned = time * (MET * 3.5 * weight) / 200;
    } else {
      return this.caloriesBurned = 0;
    }

  }
}
