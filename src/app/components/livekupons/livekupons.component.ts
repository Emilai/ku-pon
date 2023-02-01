import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';
import { LivePage } from 'src/app/modal/live/live.page';
import { CardService } from 'src/app/services/card.service';
import { ReservaPage } from '../../reserva/reserva.page';
import { OrderPipe } from 'ngx-order-pipe';
import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-livekupons',
  templateUrl: './livekupons.component.html',
  styleUrls: ['./livekupons.component.scss'],
})
export class LivekuponsComponent implements OnInit {

  cards: any[] = [];
  reserva = false;

  constructor( public liveKuponsService: LiveKuponsService,
    private modalCtrl: ModalController,
    public authService: AuthService,
    public auth: Auth,
    private orderPipe: OrderPipe,
    public cardService: CardService) { }


  async ngOnInit() {
    await this.liveKuponsService.getliveKupons(this.auth.currentUser.email).then(cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          return kupon;
        });
        this.cards = this.orderPipe.transform(this.cards, 'isoDate', true);
      });
    });
    await this.authService.userData();
  }

  async mostrarModal(card: Kupon) {
    const modal = await this.modalCtrl.create({
      component: LivePage,
      showBackdrop: true,
      canDismiss: true,
      animated: true,
    });
    this.cardService.kuponData = card;
    await modal.present();
  }

  async reservar(card) {
    const modal = await this.modalCtrl.create({
      component: ReservaPage,
      showBackdrop: true,
      canDismiss: true,
      animated: true,
    });
    this.cardService.kuponData = card;
    await modal.present();
  }

  wpp(num) {

    window.location.href = 'https://wa.me/' + num.whatsapp;
  }
}
