import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BikesService } from '../services/bikes.service';
import { WeatherService } from '../services/weather.service';
import { LocalService } from '../services/local.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-shelter-details',
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.scss']
})
export class ShelterDetailsComponent implements OnInit {

  shelterDetails: any;
  weatherDetails: any = [];
  percentageBikes: any;
  percentageStandsAvail: any;
  availBikeData: any = [];
  availStandsData: any = [];
  distanceFromUser;
  lat: any;
  lng: any;
  windSpeed: any;
  temperature: any;
  chartOptions = { cutoutPercentage: 90, legend: { display: false } };
  chartType = 'doughnut';
  backgroundColors = [
    {
      backgroundColor: [
        '#fff',
        '#0088cc'
      ],
      borderColor: [
        '#fff',
        '#0088cc'
      ],
      borderWidth: [
        '1px'
      ]
    }
  ];
  status = ["Number Of Bikes Taken", "Number Of Available Bikes"];
  statusBikeStands = ["Number Of Bikes Stands Occupied", "Available Bike Stands"];

  constructor(private bikesService: BikesService, private weatherService: WeatherService, private router: Router, private route: ActivatedRoute, private localService: LocalService, public translate: TranslateService) { }

  ngOnInit() {

    let lang = this.localService.getLanguagePref();
    if (lang === 'en') {
      this.translate.use('en');
    } else if (lang === 'es') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }

    this.getShelterDetails();
    if(this.localService.getDistanceFromUser() === 'undefined' || this.localService.getSpeedPref() === 'undefined'){
        this.distanceFromUser =  0 + ' km/h';
    }else{
      this.distanceFromUser = this.localService.getDistanceFromUser();
    }
  }

  getShelterDetails() {

    this.route.paramMap.subscribe(params => {
      const number = parseInt(params.get('id'), 10);
      const cityName = params.get('city');

      if (isNaN(number)) {
        return this.router.navigateByUrl('/');
      } else {
        this.bikesService.getShelterDetails(number, cityName).subscribe((shelter: any[]) => {
          if (shelter !== undefined) {
            this.shelterDetails = shelter;
            this.calculatePercentageBikes();
            this.calculatePercentageStands();
            this.lat = this.shelterDetails.position.lat;
            this.lng = this.shelterDetails.position.lng;
            this.weatherService.getByCoords(this.lat, this.lng).subscribe((weather: any[]) => {
              this.weatherDetails = weather;
              if (this.localService.getSpeedPref() === 'km') {
                this.windSpeed = this.weatherDetails.current.wind_kph + ' km/h';
              } else if (this.localService.getSpeedPref() === 'm') {
                this.windSpeed = this.weatherDetails.current.wind_mph + ' m/h';
              } else {
                this.windSpeed = this.weatherDetails.current.wind_kph + ' km/h';
              }
              if (this.localService.getTempPref() === 'c') {
                this.temperature = this.weatherDetails.current.temp_c + ' °C';
              } else if ((this.localService.getTempPref() === 'f')) {
                this.temperature = this.weatherDetails.current.temp_f + ' F';
              } else {
                this.temperature = this.weatherDetails.current.temp_c + ' °C';
              }
            })
          } else {
            return this.router.navigateByUrl('/');
          }
        });
      }
    });
  }

  calculatePercentageBikes() {
    let totalStands = this.shelterDetails['bike_stands'];
    let available_bikes = this.shelterDetails['available_bikes'];
    let taken = totalStands - available_bikes;
    this.availBikeData = [taken, available_bikes];
    this.percentageBikes = Math.round(available_bikes / totalStands * 100);
  }

  calculatePercentageStands() {
    let totalStands = this.shelterDetails['bike_stands'];
    let available_bike_stands = this.shelterDetails['available_bike_stands'];
    let occupiedStands = totalStands - available_bike_stands;
    this.availStandsData = [occupiedStands, available_bike_stands];
    this.percentageStandsAvail = Math.round(available_bike_stands / totalStands * 100);
  }
}
