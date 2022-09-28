/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { LiveKuponsService } from '../services/live-kupons.service';
import { MercadopagoService } from '../services/mercadopago.service';

import { get } from 'scriptjs';
import { MercadoModalPage } from '../mercado-modal/mercado-modal.page';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  user: any;
  fav: boolean;
  info: Kupon;
  init_point: any;

  preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };

  constructor(
    private modalCtrl: ModalController,
    public cardService: CardService,
    private storageService: StorageService,
    public authService: AuthService,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService,
    private mp: MercadopagoService) {

   }

  async ngOnInit() {
    get('https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js', () => {
      //library has been loaded...
    });
    // this.info = await this.cardService.kuponData;
    this.info = this.cardService.getOneCard();
    const kuponInFav = this.storageService.isInFav(this.info);
    this.fav = kuponInFav;
    await this.authService.userData();
    // await this.liveKuponsService.getliveKupons();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async onClick() {
    await this.liveKuponsService.createliveKupon(this.info);
    console.log(this.liveKuponsService.liveKupons);
    this.showAlert('Ya tienes tu KuPon', 'Disfrutalo cuando quieras!');
  }

  async pay() {

    // this.mp.goCheckOut(this.preference).subscribe(result => {
    //   // Read result of the Cloud Function.
    //   this.init_point = result.data.result;
    //   console.log(this.init_point);
    //   window.location.href = this.init_point;
    // }).catch(error => {
    //   console.log(error);
    //   return error;
    // });
    await this.requestPay();
      this.mostrarModal();

    // await this.liveKuponsService.createliveKupon(this.info);
    // console.log(this.liveKuponsService.liveKupons);
    // this.showAlert('Ya tienes tu KuPon', 'Aqui incorporaremos la pasarela de pagos');
  }

 async requestPay() {
    await this.mp.mercadopago(this.info.comercio, this.info.precio, this.info.img);
    this.init_point = this.mp.initPoint;
  }

  addFav() {
    this.fav = !this.fav;
    this.storageService.saveRemoveCard(this.info);
}

  premium() {
    this.showAlert('Ya eres Premium', 'Esto aun es un placeholder');
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  location(){
    window.location.href = 'https://maps.google.com/?q='+ this.info.location;
  }

  whatsapp() {
    window.location.href = 'https://wa.me/'+ this.info.whatsapp;
  }

  instagram() {
    window.location.href = this.info.instagram;
  }

  async mostrarModal() {
    const modal = await this.modalCtrl.create({
      component: MercadoModalPage,
      showBackdrop: true,
      canDismiss: true,
      animated: true,
    });
    await modal.present();
  }

}
