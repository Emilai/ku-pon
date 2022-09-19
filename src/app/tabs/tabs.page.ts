import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { PushService } from '../services/push.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  userInfo: any;

  constructor(private pushService: PushService, private authService: AuthService) {
  }

  async ngOnInit() {
    (await this.authService.userData2()).subscribe(async userData => {
      const userInfo = userData.data();
      this.userInfo = userInfo;
      // await this.pushService.configuracionInicialPush();
      await this.pushService.topicSubscribe(this.userInfo.code);
      await this.userInfo.grupos.forEach(grupo => this.pushService.topicSubscribe(grupo));
      await this.pushService.configuracionInicialPush();
    });
    return;

  }

}
