import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bikes',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favourites: any = [];
  isEmpty = 0;
  constructor(private localService: LocalService, public translate: TranslateService) { }

  ngOnInit() {
    this.favourites = JSON.parse(this.localService.getFavourites());
    if (this.favourites != null) {
      this.isEmpty = this.favourites.length;
      console.log(this.isEmpty);
    }
    let lang = this.localService.getLanguagePref();
    if (lang === 'en') {
      this.translate.use('en');
    } else if (lang === 'es') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }
  }

  deleteFav(shelterName){
    this.favourites.splice(shelterName,1);
    this.localService.storeFavourites(JSON.stringify(this.favourites));
  }


}
