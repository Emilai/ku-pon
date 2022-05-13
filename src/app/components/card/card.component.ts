import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { ModalPage } from 'src/app/modal/modal.page';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // cards: Observable<any>;

  cards: any[] = [];
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

async mostrarModal() {
  const modal = await this.modalCtrl.create({
    component: ModalPage
  });
  await modal.present();
  // console.log('Modal');
}

}
