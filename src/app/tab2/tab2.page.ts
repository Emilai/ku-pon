import { Component, OnInit } from '@angular/core';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Kupon } from '../interfaces';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { ModalPageRoutingModule } from '../modal/modal-routing.module';

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
  kuponInput = false;

  kuponInfo = {
    categoria: '',
    comercio: '',
    whatsapp: '',
    instagram: '',
    location: '',
    titulo: '',
    descripcion: '',
    condiciones: '',
    img: '',
    key: '',
    precio: undefined,
    valor: undefined,
    premium: false,
  };

  kuponInfo2 = {
    categoria: '',
    comercio: '',
    whatsapp: '',
    instagram: '',
    location: '',
    titulo: '',
    descripcion: '',
    condiciones: '',
    img: '',
    key: '',
    precio: undefined,
    valor: undefined,
    premium: false,
  };

  get articles(): Kupon[] {
    return this.storageService.getLocalKupons;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private storageService: StorageService,
    public cardService: CardService,
    private modalCtrl: ModalController,
    public authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) {}


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
    // this.cardService.kuponData = card;
    console.log(this.cardService.kuponData);
  }

  cargarKupones() {
    this.kuponInput = !this.kuponInput;
  }

  async cargarKupon() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.cardService.create('kupones', this.kuponInfo);
    await loading.dismiss();
    this.kuponInfo = this.kuponInfo2;
    this.showAlert('Kupon Registrado', 'Vamo Arriba!!!');
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
