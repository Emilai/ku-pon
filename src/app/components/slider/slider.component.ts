import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { CardService } from 'src/app/services/card.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/modal/modal.page';
import { Kupon } from 'src/app/interfaces';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {


  cards: any[] = [];
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

}
