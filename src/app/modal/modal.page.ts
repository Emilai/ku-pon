/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, HostListener, OnInit } from '@angular/core';
import { AlertController, isPlatform, LoadingController, ModalController } from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { DatePipe } from '@angular/common';
import { Kupon } from 'src/app/interfaces';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';
import { StorageService } from '../services/storage.service';
import { LiveKuponsService } from '../services/live-kupons.service';
import { MercadopagoService } from '../services/mercadopago.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Share } from '@capacitor/share';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Auth } from '@angular/fire/auth';
import { MailnotificationService } from '../services/mailnotification.service';
import { toDate } from 'date-fns';
import { PushService } from '../services/push.service';



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
  myDate = new Date();
  currentDate: any;
  kuponId: any = '';
  vencimiento: any;

  kuponInfo = {
    categoria: '',
    id: '',
    comercio: '',
    comercioCode: '',
    onlineCode: '',
    whatsapp: '',
    instagram: '',
    web: '',
    location: '',
    titulo: '',
    descripcion: '',
    condiciones: '',
    normalprice: '',
    discountprice: '',
    img: '',
    extras: [''],
    key: '',
    mailComercio: '',
    precio: undefined,
    valor: '',
    premium: false,
    code: '',
    isoDate: '',
    validDate: undefined,
    usuario: '',
    compraOnline: false,
  };

  constructor(
    private modalCtrl: ModalController,
    public cardService: CardService,
    private storageService: StorageService,
    public authService: AuthService,
    private alertController: AlertController,
    public liveKuponsService: LiveKuponsService,
    private mp: MercadopagoService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private loadingController: LoadingController,
    public auth: Auth,
    private iab: InAppBrowser,
    private pushService: PushService,
    private mailNS: MailnotificationService) {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy/MM/dd, HH:mm');
    this.kuponId = this.datePipe.transform(this.myDate, 'yyyy-MM-dd-HH-mm-ss-SSS');

   }

  async ngOnInit() {

    this.info = this.cardService.getOneCard();
    const kuponInFav = this.storageService.isInFav(this.info);
    this.fav = kuponInFav;
    await this.authService.userData();
    await this.requestPay();

    if (this.info.validDate.seconds) {
      this.vencimiento = this.info.validDate.toDate();
    } else {
      this.vencimiento = this.info.validDate;
    }
    // this.vencimiento = this.info.validDate.toDate();
    console.log('vencimiento::: ', this.vencimiento);
    this.vencimiento = this.datePipe.transform(this.vencimiento, 'dd/MM/yyyy');

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

    this.kuponInfo.categoria = this.info.categoria;
    this.kuponInfo.comercio = this.info.comercio;
    this.kuponInfo.comercioCode = this.info.comercioCode;
    this.kuponInfo.onlineCode = this.info.onlineCode;
    this.kuponInfo.whatsapp = this.info.whatsapp;
    this.kuponInfo.instagram = this.info.instagram;
    this.kuponInfo.web = this.info.web;
    this.kuponInfo.location = this.info.location;
    this.kuponInfo.titulo = this.info.titulo;
    this.kuponInfo.descripcion = this.info.descripcion;
    this.kuponInfo.condiciones = this.info.condiciones;
    this.kuponInfo.normalprice = this.info.normalprice;
    this.kuponInfo.discountprice = this.info.discountprice;
    this.kuponInfo.img = this.info.img;
    this.kuponInfo.extras = this.info.extras;
    this.kuponInfo.key = this.info.key;
    this.kuponInfo.precio = this.info.precio;
    this.kuponInfo.valor = this.info.valor;
    this.kuponInfo.premium = this.info.premium;
    this.kuponInfo.code = this.info.code;
    this.kuponInfo.compraOnline = this.info.compraOnline;
    this.kuponInfo.mailComercio = this.info.mailComercio;
    this.kuponInfo.validDate = this.info.validDate;
    this.kuponInfo.isoDate = this.currentDate;
    this.kuponInfo.usuario = this.auth.currentUser.email;
    this.kuponInfo.id = this.kuponId + '-' + this.auth.currentUser.email;

    // console.log(this.info.id);
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

    // info para Push a Administradores con cada venta
    const pushTitle = `Nueva venta de ${this.kuponInfo.comercio}`;
    const pushText = `El usuario ${this.auth.currentUser.email} compró un KuPon por ${this.kuponInfo.titulo}`;
    const pushGroups = 'administradores';
    this.info.contadorVentas = this.info.contadorVentas + 1;

    const loading = await this.loadingController.create();
    await loading.present();

    if (this.kuponInfo.compraOnline) {
      await this.codeGenerator();
    }else {
      console.log('esto NO es de compra online');
    }
      await this.liveKuponsService.createliveKupon2(this.kuponInfo, this.kuponInfo.id);

      await this.successMailToCompany(this.kuponInfo.usuario, this.kuponInfo.comercio, this.kuponInfo.valor, this.kuponInfo.mailComercio);
      this.pushService.sendNotification(pushTitle, pushText, pushGroups);
      await this.cardService.updateKupon(this.info.id, this.info);

      if (this.kuponInfo.compraOnline) {
        await this.successMailToUserOnline(this.kuponInfo.usuario, this.kuponInfo.comercio, this.kuponInfo.valor, this.kuponInfo.code);
      } else {
        await this.successMailToUser(this.kuponInfo.usuario, this.kuponInfo.comercio, this.kuponInfo.valor);
      }

    await loading.dismiss();
    this.showAlert('Ya tienes tu KuPon', 'Puedes verlo en "Mis KuPones". Disfrutalo cuando quieras!');
  }

  async pay() {
    this.openMercadoPago();
  }

  async successMailToUser(usuario, comercio, valor) {
    await this.mailNS.mailToUser(usuario, comercio, valor);
  }

  async successMailToUserOnline(usuario, comercio, valor, codigo) {
    await this.mailNS.mailToUserOnline(usuario, comercio, valor, codigo);
  }

  async successMailToCompany(usuario, comercio, valor, mailComercio) {
    await this.mailNS.mailToCompany(usuario, comercio, valor, mailComercio);
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

  async codeGenerator() {
    const onlineCode = await this.liveKuponsService.getOnlineCode(this.kuponInfo.comercioCode, this.kuponInfo.onlineCode).then(onlineCodeRef => onlineCodeRef);
    this.kuponInfo.code = onlineCode;
  }

  async share() { 
    await Share.share({
  title: 'See cool stuff',
  text: 'Really awesome thing you need to see right meow',
  url: 'http://ionicframework.com/',
  dialogTitle: 'Share with buddies',
  files:  ['hhttps://i.ibb.co/WH9H0KZ/icon.png/']
});;
  }
}
