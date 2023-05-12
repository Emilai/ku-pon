import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Kupon } from '../interfaces';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';

import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  user: any;
  myDate = new Date();
  cards: any;

  get articles(): Kupon[] {
    return this.storageService.getLocalKupons;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private storageService: StorageService,
    public cardService: CardService,
    private modalCtrl: ModalController,
    public authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }


  async ngOnInit() {
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();

  }

  async mostrarModal(card: Kupon) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      //showBackdrop: true,
      // canDismiss: true,
      animated: true,
    });
    this.cardService.kuponData = card;
    await modal.present();
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


}
