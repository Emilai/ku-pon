import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  wpp() {
    window.location.href = 'https://wa.me/59891089497';
  };
  insta(){
    window.location.href = 'https://www.instagram.com/kupon.uy/';
  };
  web(){
    window.location.href = 'https://www.kupon.uy/';

  }

}
