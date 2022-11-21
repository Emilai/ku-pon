import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { CardService } from 'src/app/services/card.service';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  user: any;
  info: Kupon;
  dateSelected: any;

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
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

  kuponCode(kupon) {
    const date = this.dateSelected;
    const data = {
      comercio: kupon.comercio,
      fecha: date,
      code: kupon.code
    };
    if (this.dateSelected !== undefined) {
      this.liveKuponsService.registerReservation(data);
      this.showAlert('Tu reserva se ha realizado', `Usuario: ${this.authService.userInfo.email}`, `Fecha: ${this.dateSelected}`);
    } else {
      this.showAlert('Tu reserva no fue realizada', `Por favor selecciona una fecha válida`, `Gracias!!!`);
    }

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
