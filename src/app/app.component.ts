import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, Platform, IonRouterOutlet } from '@ionic/angular';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';


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
    private location: Location,
    private router: Router,
    private zone: NgZone
  ) {
    this.backButtonEvent();
    this.showSplash();
    this.initializeApp();

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

  initializeApp(){
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const domain = 'kupon.uy';
        const pathArray = event.url.split(domain);
        const appPath = pathArray.pop();

        if (appPath) {
          this.router.navigateByUrl(appPath);
        }
      });
    });
  }

  private async showSplash() {
    const lottie = (window as any).lottie;

      if (this.platform.is('ios') && lottie) {
        await lottie.splashscreen.hide();
        await this.platform.ready();
        await lottie.splashscreen.show('public/assets/kupon.json', false);
      }

    // if (this.platform.is('android') && lottie) {
    //   await lottie.splashscreen.hide();
    //   await this.platform.ready();
    //   await lottie.splashscreen.show('public/assets/kupon.json', false);
    // }

    // if (this.platform.is('ios') && lottie) {
    //   await lottie.splashscreen.show('public/assets/kupon.json', false);
    // }

    // if (this.platform.is('android') && lottie) {
    //   await lottie.splashscreen.hide();
    //   await lottie.splashscreen.show('public/assets/kupon.json', false);
    // }
  }
}
