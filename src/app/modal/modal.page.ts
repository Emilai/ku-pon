/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { LiveKuponsService } from '../services/live-kupons.service';
import { MercadopagoService } from '../services/mercadopago.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';



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
  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(
    private modalCtrl: ModalController,
    public cardService: CardService,
    private storageService: StorageService,
    public authService: AuthService,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService,
    private mp: MercadopagoService,
    private sanitizer: DomSanitizer,
    private iab: InAppBrowser) {

   }

  async ngOnInit() {

    this.info = this.cardService.getOneCard();
    const kuponInFav = this.storageService.isInFav(this.info);
    this.fav = kuponInFav;
    await this.authService.userData();
    await this.requestPay();

    this.stars = this.cardService.getKuponStars(this.info.id);

    this.avgRating = this.stars.pipe(map(arr => {
      const ratings = arr.map(v => v.value);
      const finalVal = ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'Aún no hay Calificaciones';
      if (finalVal !== 'Aún no hay Calificaciones') {
        return finalVal.toFixed(1);
      } else {
        return finalVal;
      }
    }));
  }

  starHandler(value) {
    this.cardService.setStar(this.authService.userInfo.email, this.info.id, value);
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
    this.showAlert('Ya tienes tu KuPon', 'Puedes verlo en "Mis KuPones". Disfrutalo cuando quieras!');
  }

  async pay() {
    this.openMercadoPago();
  }

 async requestPay() {
   await this.mp.mercadopago(this.info.comercio, this.info.precio, this.info.img, this.authService.userInfo.nombre, this.authService.userInfo.email);
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

  web() {
    window.location.href = this.info.web;
  }

  async openMercadoPago() {

    const fail = 'fail';
    const success = 'success';

    const pageRef = this.iab.create(this.init_point, '_blank', 'location=no,toolbar=no,zoom=no');

    pageRef.on('loadstart').subscribe(event => {
      console.log(event.url);

      if (event.url.includes(fail)) {
        pageRef.close();
        this.showAlert('Hubo un error en el proceso de pago', 'Intentalo nuevamente y disfruta tu KuPon!');

      } else if (event.url.includes(success)) {
        pageRef.close();
        this.onClick();
      }
    });
  }


}
