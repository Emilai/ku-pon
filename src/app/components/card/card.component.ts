import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // cards: Observable<any>;

  cards: any[] = [];

  constructor( private cardService: CardService) { }

  ngOnInit() {

    this.cardService.getCards().subscribe ( cards => {
      this.cards = cards;
      console.log(this.cards);
    });
    // this.cards = this.cardService.getCards();

  }
}
