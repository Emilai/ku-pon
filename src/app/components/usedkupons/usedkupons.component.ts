import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { LiveKuponsService } from 'src/app/services/live-kupons.service';
import { OrderPipe } from 'ngx-order-pipe';
import { OrderModule } from 'ngx-order-pipe';

@Component({
  selector: 'app-usedkupons',
  templateUrl: './usedkupons.component.html',
  styleUrls: ['./usedkupons.component.scss'],
})
export class UsedkuponsComponent implements OnInit {

  cards: any[] = [];

  constructor(
    private liveKuponsService: LiveKuponsService,
    public auth: Auth,
    private orderPipe: OrderPipe
  ) { }

  async ngOnInit() {
    await this.liveKuponsService.getUsedKupons(this.auth.currentUser.email).then(cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          return kupon;
        });
        this.cards = this.orderPipe.transform(this.cards, 'isoDate', true);
      });
    });
  }

  onClick() {
    console.log(this.cards);
  }
}
