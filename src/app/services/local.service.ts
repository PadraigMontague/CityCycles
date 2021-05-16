import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  storeDistanceTraveled(distance) {
    localStorage.setItem('distTravel', distance);
  }
  getDistanceTraveled() {
    return localStorage.getItem('distTravel');
  }

  storeSpeed(speed) {
    localStorage.setItem('speed', speed);
  }

  getSpeed() {
    return localStorage.getItem('speed');
  }

  storeTripDuration(time) {
    localStorage.setItem('tripDuration', time);
  }

  getTripDuration() {
    return localStorage.getItem('tripDuration');
  }

  storeSearchPreference(searchPreference) {
    localStorage.setItem('searchManual', searchPreference);
  }

  getSearchPreference() {
    return localStorage.getItem('searchManual');
  }

  storeGPSPreference(GPSpreference) {
    localStorage.setItem('enableGPS', GPSpreference);
  }

  getGPSPreference() {
    return localStorage.getItem('enableGPS');
  }

  removeGPSPreference() {
    localStorage.removeItem('enableGPS');
  }

  storeSearchHistory(searchData) {
    localStorage.setItem('searchHistory', searchData);
  }

  getSearchHistory() {
    return localStorage.getItem('searchHistory');
  }

  storeFavourites(favouritesData) {
    localStorage.setItem('favourites', favouritesData);
  }

  getFavourites() {
    return localStorage.getItem('favourites');
  }

  storeLanguagePref(languagePref) {
    localStorage.setItem('lang-pref', languagePref);
  }

  getLanguagePref() {
    return localStorage.getItem('lang-pref');
  }

  storeTempPref(unit) {
    localStorage.setItem('temp-pref', unit);
  }

  getTempPref() {
    return localStorage.getItem('temp-pref');
  }

  storeSpeedPref(unit) {
    localStorage.setItem('speed-pref', unit);
  }

  getSpeedPref() {
    return localStorage.getItem('speed-pref');
  }

  storeDistanceFromUser(distance) {
    localStorage.setItem('distance-from-user', distance);
  }

  getDistanceFromUser() {
    return localStorage.getItem('distance-from-user');
  }

  clearAllData() {
    localStorage.clear();
  }
}
