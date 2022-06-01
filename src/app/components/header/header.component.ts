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
    console.log('Wpp working');
    window.location.href = 'https://wa.me/59891089497';
    // this.router.navigateByUrl('https://wa.me/59898608201');
  };
  insta(){
    console.log('instagram working');
    window.location.href = 'https://www.instagram.com/kupon.uy/';
  };
  web(){
    console.log('web working');
    window.location.href = 'https://www.kupon.uy/';

  }

}
