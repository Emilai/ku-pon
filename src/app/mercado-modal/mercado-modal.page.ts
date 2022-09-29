import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { MercadopagoService } from '../services/mercadopago.service';
import { Browser } from '@capacitor/browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-mercado-modal',
  templateUrl: './mercado-modal.page.html',
  styleUrls: ['./mercado-modal.page.scss'],
})
export class MercadoModalPage implements OnInit {

  html: any;
  iframe = true;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private mp: MercadopagoService,
    private iab: InAppBrowser,
    private alertController: AlertController) { }

  ngOnInit() {
    this.html = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.mp.initPoint
    );
    this.openCapacitorSite2();
  }

  // openCapacitorSite = async () => {
  //   await Browser.open({ url: this.mp.initPoint });
  //   await Browser.addListener('browserFinished', () => {
  //     console.log('browserFinished');
  //   });
  // };

  async openCapacitorSite2() {
    const pageRef = await this.iab.create(this.mp.initPoint);
    pageRef.on('exit').subscribe(event => {
      pageRef.close();
      this.showAlert('Funcionando on Exit', event.composedPath());
    });
  };

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
}
