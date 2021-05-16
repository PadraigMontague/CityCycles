import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navigationLinks = [
    { path: '/', name: 'NAVBAR.HOMEPAGE' },
    { path: '/favourites', name: 'NAVBAR.FAVOURITESPAGE' },
    { path: '/dashboard', name:  'NAVBAR.DASHBOARDPAGE' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
