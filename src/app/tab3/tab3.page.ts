import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController, IonAccordionGroup } from '@ionic/angular';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {

  }


  async ngOnInit() {
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();
    }



  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true});
  }

  premium() {
    this.showAlert('Ya eres Premium', 'Esto aun es un placeholder');
      }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
