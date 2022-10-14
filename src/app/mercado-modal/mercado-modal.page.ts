
import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LiveKuponsService } from '../services/live-kupons.service';

@Component({
  selector: 'app-mercado-modal',
  templateUrl: './mercado-modal.page.html',
  styleUrls: ['./mercado-modal.page.scss'],
})
export class MercadoModalPage implements OnInit {

  html: any;
  iframe = true;
  cards: any;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService,
    public authService: AuthService) { }

  async ngOnInit() {
    await this.authService.userData();
    await this.liveKuponsService.getCompanyKupons(this.authService.userInfo.code).then(cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          kupon['id'] = kuponRef.payload.doc.id;
          return kupon;
        });
      });
    });

  }


  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss();
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  location(web) {
    window.location.href = web;
  }

  whatsapp(tel) {
    window.location.href = 'https://wa.me/' + tel;
  }

  instagram(insta) {
    window.location.href = insta;
  }
}
