import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/home/home.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShelterDetailsComponent } from './shelter-details/shelter-details.component';
import { NotfoundComponent } from '../app/notfound/notfound.component';
import { SettingsComponent } from '../app/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' }  },
  { path: 'favourites', component: FavouritesComponent},
  { path: 'dashboard', component: DashboardComponent, data: { animation: 'Dashboard' }},
  { path: 'shelter-details/:id/:city', component: ShelterDetailsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
