import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { LiveKuponsService } from '../services/live-kupons.service';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  user: any;
  fav: boolean;
  info: Kupon;

  constructor(
    private modalCtrl: ModalController,
    public cardService: CardService,
    private storageService: StorageService,
    public authService: AuthService,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService) {

   }

  async ngOnInit() {
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
    this.showAlert('Ya tienes tu KuPon', 'Aqui incorporaremos la pasarela de pagos');
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

}
