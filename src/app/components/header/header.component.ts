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
    // this.router.navigateByUrl('https://wa.me/59898608201');
  };
  insta(){
    console.log('instagram working');
  };
  web(){
    console.log('web working');
  }

}
