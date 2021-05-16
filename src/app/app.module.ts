import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app/app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShelterDetailsComponent } from './shelter-details/shelter-details.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { BikesService } from './services/bikes.service';
import { WeatherService } from './services/weather.service';
import { LocalService } from './services/local.service';
import { SettingsComponent } from './settings/settings.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

const translateModule = TranslateModule.forRoot({loader: {
  provide   : TranslateLoader,
  useFactory: HttpLoaderFactory,
  deps      : [HttpClient]
}});

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FavouritesComponent,
    HomeComponent,
    DashboardComponent,
    ShelterDetailsComponent,
    NotfoundComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    translateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [BikesService, WeatherService, LocalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
