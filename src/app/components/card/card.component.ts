import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';

import { ModalPage } from 'src/app/modal/modal.page';
import { Kupon } from 'src/app/interfaces';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // cards: Observable<any>;

  cards: Kupon[] = [];
  textoBuscar = '';

  constructor( private cardService: CardService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.cardService.getCards().subscribe ( cards => {
      this.cards = cards;
    });
    // this.cards = this.cardService.getCards();

  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
}

async mostrarModal(card: Kupon) {
  const modal = await this.modalCtrl.create({
    component: ModalPage
  });
  await modal.present();
  this.cardService.kuponData = card;
  console.log(card);
}


}
