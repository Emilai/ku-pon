import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  fav: boolean;
  info: Kupon;

  constructor( private modalCtrl: ModalController, public cardService: CardService, private storageService: StorageService) {

   }

  async ngOnInit() {
    // this.info = await this.cardService.kuponData;
    this.info = this.cardService.getOneCard();
    const kuponInFav = this.storageService.isInFav(this.info);
    this.fav = kuponInFav;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  onClick() {
    console.log('Comprar kupon');
  }

  addFav() {
    this.fav = !this.fav;
    this.storageService.saveRemoveCard(this.info);
}
}
