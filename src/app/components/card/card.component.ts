import { Component, OnInit, ViewChild} from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalPage } from 'src/app/modal/modal.page';
import { Kupon } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { MercadoModalPage } from '../../mercado-modal/mercado-modal.page';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  cards: any [] = [];
  textoBuscar = '';
  user: any;
  categories: Observable<any>;
  catSelected = '';
  cardContent = document.getElementById('cardContent');
  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private cardService: CardService, private modalCtrl: ModalController,
    private dataService: DataService, public authService: AuthService
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

    this.categories = this.dataService.getCategories();
    // console.log(this.categories);
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();

  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
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


}

