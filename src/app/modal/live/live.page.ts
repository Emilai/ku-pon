import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';



@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {
  user: any;
  info: Kupon;

  constructor(
    private modalCtrl: ModalController,
    public cardService: CardService,
    public authService: AuthService,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService) {

  }

  async ngOnInit() {
    this.info = this.cardService.getOneCard();
    await this.authService.userData();
    console.log(this.info);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('window:popstate', ['$event'])

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  kuponCode() {
    this.showAlert('Datos para utilizar tu KuPon', 'Código:', this.info.code);
  }

  async showAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  location() {
    window.location.href = 'https://maps.google.com/?q=' + this.info.location;
  }

  whatsapp() {
    window.location.href = 'https://wa.me/' + this.info.whatsapp;
  }

  instagram() {
    window.location.href = this.info.instagram;
  }

}
