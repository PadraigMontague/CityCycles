import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

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
  }

}
