import { Component, OnInit, ViewChild} from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { AlertController, IonContent, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalPage } from 'src/app/modal/modal.page';
import { Kupon } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { MercadoModalPage } from '../../mercado-modal/mercado-modal.page';
import { LowerCasePipe } from '@angular/common';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';
import { DatePipe } from '@angular/common';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  kuponInput = false;
  cards: any [] = [];
  comercioCards: any[] = [];
  textoBuscar = 'inicio';
  verifySearch = '';
  user: any;
  categories: Observable<any>;
  catSelected = '';
  cardContent = document.getElementById('cardContent');
  stars: Observable<any>;
  avgRating: Observable<any>;
  currentDate: any;
  myDate = new Date();
  ageVerify = false;

  verify = {
    email: '',
    code: ''
  };

  verify2 = {
    email: '',
    code: ''
  };

  checkedKupon: any;
  reset: any = '';
  checked: any = '';
  verifyBox = false;
  verifyBtn = true;

  endorsers: any[] = [];

  kuponInfo = {
    categoria: '',
    comercio: '',
    comercioCode: '',
    mailComercio: '',
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
    extras:[''],
    key: '',
    precio: undefined,
    valor: '',
    premium: false,
    code: '',
    compraOnline: false,
    onlineCode: ''
  };

  kuponInfo2 = {
    categoria: '',
    comercio: '',
    comercioCode: '',
    mailComercio: '',
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
    precio: undefined,
    valor: '',
    premium: false,
    code: '',
    compraOnline: false,
    onlineCode: ''
  };

  constructor(private cardService: CardService, private modalCtrl: ModalController,
    private dataService: DataService, public authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private lowerCase: LowerCasePipe,
    private liveKuponsService: LiveKuponsService,
    private orderPipe: OrderPipe,
    private datePipe: DatePipe
  ) { this.currentDate = this.datePipe.transform(this.myDate, 'yyyy/MM/dd, HH:mm');
     }

  async ngOnInit() {

    await this.cardService.getCards().then ( cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          kupon['id'] = kuponRef.payload.doc.id;
          return kupon;
        });
      });
    });

    await this.cardService.getConvenio().then(endorserss => {
      endorserss.subscribe(endorsers => {
        this.endorsers = endorsers.map(endorsersRef => {
          const endors = endorsersRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          endors['id'] = endorsersRef.payload.doc.id;
          return endors;
        });
      });
    });

    this.categories = this.dataService.getCategories();
    // console.log(this.categories);
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();

  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
}

  onSearchChangeVerify(event) {
    this.verifySearch = event.detail.value;
  }

  cargarKupones() {
    this.kuponInput = !this.kuponInput;
  }

async mostrarModal(card: Kupon) {
  const modal = await this.modalCtrl.create({
    component: ModalPage,
    showBackdrop: true,
    canDismiss: true,
    animated: true,
  });
  this.cardService.kuponData = card;
  await modal.present();
}

  categorieFilter(categorie) {
    this.textoBuscar = categorie;
    this.content.scrollToPoint(0, 300, 500);

  }

  async corporativos() {
    const modal = await this.modalCtrl.create({
      component: MercadoModalPage,
      showBackdrop: true,
      canDismiss: true,
      animated: true,
    });
    await modal.present();
  }

  async cargarKupon() {
    const loading = await this.loadingController.create();
    await loading.present();
    await this.cardService.create('kupones', this.kuponInfo);
    await loading.dismiss();
    // this.kuponInfo = this.kuponInfo2;
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

  async verifyKupon(kupon) {

    try {
              this.checked = {
                // eslint-disable-next-line object-shorthand
                id: kupon.id,
                usuarioPremium: this.authService.userInfo.premium,
                categoria: kupon.categoria,
                valor: kupon.valor,
                precio: kupon.precio,
                comercio: kupon.comercio,
                comercioCode: kupon.comercioCode,
                code: kupon.code,
                img: kupon.img,
                usuario: kupon.usuario,
                isoDate: this.currentDate
              };

              await this.liveKuponsService.registerUsedKupon(this.checked);
              await this.liveKuponsService.deleteUsedKupon(kupon.id);
              await this.showAlert('Datos Correctos!', 'El KuPon ha sido confirmado');

              this.checked = this.reset;
              kupon = this.reset;
              this.verify = this.verify2;

    } catch (error) {
      this.showAlert('El KuPon no pudo verificarse!', 'Contactate con KuPon');
    }
  }


  async verificar() {
    this.verifyBox = !this.verifyBox;
    this.verifyBtn = !this.verifyBtn;
    await this.loadLive();
  }


  async loadLive() {
    await this.liveKuponsService.checkLiveKupons(this.authService.userInfo.comercioCode).then(cards => {
      cards.subscribe(kupones => {
        this.comercioCards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          return kupon;
        });
      });
      this.comercioCards = this.orderPipe.transform(this.comercioCards, 'usuario', true);
      console.log(this.comercioCards);
    });
  }

  async preverify(card) {
    this.alert('El KuPon de descuento será confirmado como Utilizado', 'Desea continuar?', card);
  }


  async alert(header, message, card) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.verifyKupon(card);
        }
      }]
    });
    await alert.present();
  }

  click(card) {
    console.log(card);
  }
}

