import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  checkTracking: any;
  english: any;
  spanish: any;
  constructor(private localService: LocalService, public translate: TranslateService) { }

  ngOnInit() {
    let fetchedLanguage = this.translate.getLangs();
    this.english = fetchedLanguage[0];
    this.spanish = fetchedLanguage[1];
    this.checkTracking = setInterval(() => {
      let GPSstatus = this.localService.getGPSPreference();
      if (GPSstatus != 'enabled') {
        (<HTMLInputElement>document.querySelector('.trackingOn')).checked = false;
        (<HTMLInputElement>document.querySelector('.trackingOff')).checked = true;
      }

      let lang = this.localService.getLanguagePref();
      if (lang === 'en') {
        (<HTMLInputElement>document.querySelector('#english')).checked = true;
        (<HTMLInputElement>document.querySelector('#spanish')).checked = false;
        this.translate.use('en');
      } else if (lang === 'es') {
        (<HTMLInputElement>document.querySelector('#english')).checked = false;
        (<HTMLInputElement>document.querySelector('#spanish')).checked = true;
        this.translate.use('es');
      }
      else {
        (<HTMLInputElement>document.querySelector('#english')).checked = true;
        (<HTMLInputElement>document.querySelector('#spanish')).checked = false;
        this.translate.use('en');
      }

      let temp = this.localService.getTempPref();
      if (temp === 'f') {
        (<HTMLInputElement>document.querySelector('#C')).checked = false;
        (<HTMLInputElement>document.querySelector('#F')).checked = true;
      }

      let speed = this.localService.getSpeedPref();
      if (speed === 'm') {
        (<HTMLInputElement>document.querySelector('#km')).checked = false;
        (<HTMLInputElement>document.querySelector('#m')).checked = true;
      }
    }, 100);
  }
  clearLocalData() {
    this.localService.clearAllData();
  }

  enableGPS() {
    this.localService.storeGPSPreference('enabled');
  }

  disableGPS() {
    this.localService.removeGPSPreference();
  }

  ngOnDestroy() {
    clearInterval(this.checkTracking);
  }

  langPref(lang) {
    this.translate.use(lang);
    this.localService.storeLanguagePref(lang);
  }

  tempPref(unit) {
    this.localService.storeTempPref(unit);
  }

  speedPref(unit) {
    this.localService.storeSpeedPref(unit);
  }
}
