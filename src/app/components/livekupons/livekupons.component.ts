import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Kupon } from 'src/app/interfaces';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';
import { LivePage } from 'src/app/modal/live/live.page';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-livekupons',
  templateUrl: './livekupons.component.html',
  styleUrls: ['./livekupons.component.scss'],
})
export class LivekuponsComponent implements OnInit {

  cards: any[] = [];

  constructor( public liveKuponsService: LiveKuponsService,
    private modalCtrl: ModalController,
    public cardService: CardService) { }


  async ngOnInit() {
    await this.liveKuponsService.getliveKupons().then(cards => {
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

}
