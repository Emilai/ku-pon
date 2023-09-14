import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
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
    private barcodeScanner: BarcodeScanner
    ) { }

  async ngOnInit() {
    await this.authService.userData();
    (await this.authService.codes()).subscribe(userData => {
      const codeInfo = userData.data();
      this.codes = codeInfo;
    });
  }


  scan() {
    this.barcodeScanner.scan({
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      prompt: 'Escanea tu QR promocional de KuPon!', // Android
    }).then(barcodeData => {
      // this.inputCode = barcodeData.text;
      this.qrCode(barcodeData.text);
    }).catch(err => {
      this.showAlert('Error', 'El código no ha podido ser escaneado');
      console.log('Error: ', err);
    });

  }
  async qrCode(codigo) {

    const codigoQr = codigo.toLowerCase();
    const path = 'Usuarios';

    const loading = await this.loadingController.create();
    await loading.present();

    if (this.codes[codigoQr]) {
      // console.log(this.authService.userInfo);
      this.authService.userInfo.saldo = this.authService.userInfo.saldo + this.codes[codigoQr];
      await this.authService.createUser(this.authService.userInfo, path, this.authService.userInfo.id);

      await loading.dismiss();
      this.showAlert('Saldo Kuponero cargado!', `Tu nuevo saldo es de $${this.authService.userInfo.saldo}`);

    } else {
      await loading.dismiss();
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
