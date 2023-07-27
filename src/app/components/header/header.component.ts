import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  codes: any;
  inputCode = '';

  userInfo = this.authService.userInfo;

  constructor(private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    ) { }

  async ngOnInit() {
    await this.authService.userData();
    (await this.authService.codes()).subscribe(userData => {
      const codeInfo = userData.data();
      this.codes = codeInfo;
    });
  }

  async qrCode() {

    const codigo = this.inputCode.toLowerCase();
    const path = 'Usuarios';

    if (this.codes[codigo]) {
      // console.log(this.authService.userInfo);
      this.authService.userInfo.saldo = this.authService.userInfo.saldo + this.codes[codigo];
      await this.authService.createUser(this.authService.userInfo, path, this.authService.userInfo.id);
      this.showAlert('Saldo Kuponero cargado!', `Tu nuevo saldo es de $${this.authService.userInfo.saldo}`);

    } else {
      this.showAlert('Codigo erroneo', 'Por favor intente denuevo');
    }
  }

  wpp() {
    window.location.href = 'https://wa.me/59898608201';
  };
  insta(){
    window.location.href = 'https://www.instagram.com/kupon.uy/';
  };
  web(){
    window.location.href = 'https://www.kupon.uy/';

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
