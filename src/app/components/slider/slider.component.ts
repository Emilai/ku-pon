import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { CardService } from 'src/app/services/card.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';
import { Kupon } from 'src/app/interfaces';
import { WSAEINVALIDPROCTABLE } from 'constants';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {


  cards: any[] = [];
  endorsers: any[] = [];
  sliders: any[] = [];

  constructor(private cardService: CardService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    await this.cardService.getCards().then(cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          kupon['id'] = kuponRef.payload.doc.id;
          return kupon;
        });
      });
    });

    await this.cardService.getEndorsers().then(endorserss => {
      endorserss.subscribe(endorsers => {
        this.endorsers = endorsers.map(endorsersRef => {
          const endors = endorsersRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          endors['id'] = endorsersRef.payload.doc.id;
          return endors;
        });
      });
    });

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

  endorserLink(link) {
    window.location.href = link;
  }

}
