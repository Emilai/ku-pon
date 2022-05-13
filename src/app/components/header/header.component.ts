import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  wpp() {
    console.log('whatsapp working');
  };
  insta(){
    console.log('instagram working');
  };
  web(){
    console.log('web working');
  }

}
