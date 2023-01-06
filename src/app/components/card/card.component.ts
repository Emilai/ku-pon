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
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  kuponInput = false;
  cards: any [] = [];
  textoBuscar = '';
  user: any;
  categories: Observable<any>;
  catSelected = '';
  cardContent = document.getElementById('cardContent');
  stars: Observable<any>;
  avgRating: Observable<any>;

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
  };

  kuponInfo2 = {
    categoria: '',
    comercio: '',
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
  };

  constructor(private cardService: CardService, private modalCtrl: ModalController,
    private dataService: DataService, public authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private lowerCase: LowerCasePipe,
    private liveKuponsService: LiveKuponsService
    ) { }

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

  async verifyKupon() {
    const email = this.verify.email.toLowerCase();
    const code = this.verify.code.toLowerCase();

    try {
      await this.liveKuponsService.checkLiveKupons(email, code).then(cards => {
        cards.subscribe(async kupones => {
          this.checkedKupon = kupones.data();
          let kupon = kupones.data();

          if (kupon) {
            if (kupon.code === code) {
              this.checked = kupon;

              await this.liveKuponsService.registerUsedKupon(this.checked, email);
              await this.liveKuponsService.deleteUsedKupon(email, code);
              await this.showAlert('Datos Correctos!', 'El KuPon ha sido confirmado');

              this.checked = this.reset;
              kupon = this.reset;
              this.verify = this.verify2;


            } else {
              this.showAlert('Datos Erroneos!', 'El Usuario no cuenta con el KuPon');
              console.log('Fail', this.checked);
            };
          } else {
            this.showAlert('Datos erroneos!', 'Verifica los datos del KuPon');
          }

        });

      });
    } catch (error) {
      // Aca sale un error si el kupon se ingresa vacio

      this.showAlert('Datos erroneos!', 'Debes ingresar los datos del KuPon');
    }
  }

  verificar() {
    this.verifyBox = !this.verifyBox;
    this.verifyBtn = !this.verifyBtn;
  }

  async preverify() {

    const email = this.verify.email.toLowerCase();
    const code = this.verify.code.toLowerCase();

    try {
      await this.liveKuponsService.checkLiveKupons(email, code).then(cards => {
        cards.subscribe(async kupones => {
          this.checkedKupon = kupones.data();
          const kupon = kupones.data();

          if (kupon) {
            if (kupon.code === code) {
              this.alert('El KuPon ingresado es Correcto', 'Desea confirmar que será utilizado?');


            } else {
              this.showAlert('Datos Erroneos!', 'El Usuario no cuenta con el KuPon');
              console.log('Fail', this.checked);
            };
          } else {
            this.showAlert('Datos erroneos!', 'Verifica los datos del KuPon');
          }

        });

      });
    } catch (error) {
      // Aca sale un error si el kupon se ingresa vacio

      this.showAlert('Datos erroneos!', 'Debes ingresar los datos del KuPon');
    }
  }


  async alert(header, message) {
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
          this.verifyKupon();
        }
      }]
    });
    await alert.present();
  }
}

