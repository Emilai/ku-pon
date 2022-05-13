import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { CardService } from 'src/app/services/card.service';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {


  cards: any[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit() {
    this.cardService.getSliders().subscribe(cards => {
      this.cards = cards;
    });
  }

}
