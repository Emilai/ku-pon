import { Component } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Kupon } from '../interfaces';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { ModalPageRoutingModule } from '../modal/modal-routing.module';

import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  get articles(): Kupon[] {
    return this.storageService.getLocalKupons;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private storageService: StorageService, public cardService: CardService, private modalCtrl: ModalController) {}

  async mostrarModal(card: Kupon) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      //showBackdrop: true,
      // canDismiss: true,
      animated: true,
    });
    this.cardService.kuponData = card;
    await modal.present();
    // this.cardService.kuponData = card;
    console.log(this.cardService.kuponData);
  }

}
