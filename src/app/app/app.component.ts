import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { newPageAnimation } from 'src/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ newPageAnimation ]
})
export class AppComponent {
  title = 'cyclingApp';

  constructor(public translate: TranslateService){
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  /**
   * REFERENCE:
   * https://angular.io/guide/route-animations
   */
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  /**
   * END OF REFERENCE
   */
}
