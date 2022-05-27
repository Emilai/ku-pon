import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { CardService } from '../services/card.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  fav = false;
  info: Kupon;

  constructor( private modalCtrl: ModalController, public cardService: CardService) {

   }

  async ngOnInit() {
    // this.info = await this.cardService.kuponData;
    this.info = this.cardService.getOneCard();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  onClick() {
    console.log('Comprar kupon');
  }

  addFav() {
    this.fav = !this.fav;
}
}
