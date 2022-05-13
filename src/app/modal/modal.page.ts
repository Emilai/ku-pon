import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  fav = false;



  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  salir() {
    this.modalCtrl.dismiss();
  }

  onClick() {
    console.log('Comprar kupon');
  }

  addFav() {
    this.fav = !this.fav;
}
}
