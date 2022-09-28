import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { MercadopagoService } from '../services/mercadopago.service';

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
    private mp: MercadopagoService) { }

  ngOnInit() {
    this.html = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.mp.initPoint
    );

  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  salir() {
    this.modalCtrl.dismiss();
  }
}
