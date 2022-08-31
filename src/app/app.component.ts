import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, Platform, IonRouterOutlet } from '@ionic/angular';

import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true}) routerOutlet: IonRouterOutlet;
  id: any;
  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private location: Location
  ) {
    this.backButtonEvent();
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if(!this.routerOutlet.canGoBack()) {
        this.backButtonAlert();
      } else {
        this.location.back();
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'Seguro que quieres cerrar KuPon?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      },{
        text: 'Si',
        handler: () => {
          // eslint-disable-next-line @typescript-eslint/dot-notation
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }

}
