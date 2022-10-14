import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../services/auth.service';
import {
  AlertController,
  IonAccordionGroup
} from '@ionic/angular';
import {
  LiveKuponsService
} from '../services/live-kupons.service';

import { LowerCasePipe } from '@angular/common';




@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: any;
  actualizarDatos = false;
  userInfo = {
    id: this.authService.userInfo.id,
    nombre: this.authService.userInfo.nombre,
    email: this.authService.userInfo.email,
    tel: this.authService.userInfo.tel,
    img: this.authService.userInfo.img,
    premium: this.authService.userInfo.premium,
    admin: this.authService.userInfo.admin,
    superadmin: this.authService.userInfo.superadmin
  };

  verify = {
    email: '',
    code: ''
  };

  verify2 = {
    email: '',
    code: ''
  };

  checkedKupon: any;
  reset: any = '';
  checked: any = '';
  verifyBox = false;
  verifyBtn = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private liveKuponsService: LiveKuponsService,
    private lowerCase: LowerCasePipe,
  ) {

  }


  async ngOnInit() {
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();
  }



  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', {
      replaceUrl: true
    });
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

  actualizar() {
    this.actualizarDatos = !this.actualizarDatos;
  }

  async actualizarDatosUsuario() {
    const id = this.user.uid;
    await this.authService.update('Usuarios', id, this.userInfo).then(res => {
      this.showAlert('Actualizado!', 'Ya haz actualizado tus datos');
    }).catch(err => {
      console.log('Error al modificar ', err);
      this.showAlert('Error!', 'Los datos no pudieron actualizarse');
    });
    this.actualizarDatos = !this.actualizarDatos;

  }

  async verifyKupon() {
    const email = this.verify.email.toLowerCase();
    const code = this.verify.code.toLowerCase();
    try {
      await this.liveKuponsService.checkLiveKupons(email, code).then(cards => {
        cards.subscribe(async kupones => {
          this.checkedKupon = kupones.data();
          let kupon = kupones.data();

          if(kupon) {
            if (kupon.code === code) {
              this.checked = kupon;
              console.log('exito', this.checked);

              await this.liveKuponsService.registerUsedKupon(this.checked);
              await this.liveKuponsService.deleteUsedKupon(email, code);
              await this.showAlert('Datos Correctos!', 'El KuPon ha sido confirmado');

              this.checked = this.reset;
              kupon = this.reset;
              this.verify = this.verify2;


            } else {
              this.showAlert('Datos Erroneos!', 'El Usuario no cuenta con el KuPon');
              console.log('Fail', this.checked);
            };
          } else {
            this.showAlert('Datos erroneos!', 'Verifica los datos del KuPon');
          }

        });

      });
    } catch (error) {
      // Aca sale un error si el kupon se ingresa vacio

      this.showAlert('Datos erroneos!', 'Debes ingresar los datos del KuPon');
    }
  }

  async showAlert2(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          this.deleteAccount();
          this.authService.deleteAuthData();
        }
      }]
    });
    await alert.present();
  }

  deleteAccountOption() {
    this.showAlert2('Su cuenta será borrada', 'Desea hacerlo?');
  }

  async deleteAccount() {
    await this.authService.deleteUserData();
    await this.authService.logout();
    this.router.navigateByUrl('/login', {
      replaceUrl: true
    });
    this.showAlert('Su cuenta ha sido eliminada', 'Para volver a utilizar KuPon deberá registrarse nuevamente.');
  }

  verificar() {
    this.verifyBox = !this.verifyBox;
    this.verifyBtn = !this.verifyBtn;
  }
}
