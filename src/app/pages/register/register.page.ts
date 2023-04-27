import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MailnotificationService } from 'src/app/services/mailnotification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials: UntypedFormGroup;
  userInfo= {
    nombre: '',
    code: '',
    empresa: '',
    tel: undefined
  };
  codes: any;
  checked = false;
  hide = true;

  constructor(

    private fb: UntypedFormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private mns: MailnotificationService,
    private router: Router
  ) { }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    (await this.authService.codes()).subscribe(userData => {
      const codeInfo = userData.data();
      this.codes = codeInfo;
      // console.log(this.codes);
    });
}

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);

    if (!user) {
      await loading.dismiss();
      this.showAlert('El mail ya se encuentra registrado', 'Intente recuperar su contraseña');
    };

    const codeToLowerCase = this.userInfo.code.toLowerCase();

    const usuario: Usuario = {
      id: user.user.uid,
      nombre: this.userInfo.nombre,
      email: user.user.email,
      tel: this.userInfo.tel,
      img: '',
      empresa: this.userInfo.empresa,
      code: codeToLowerCase,
      grupos: ['General'],
      premium: false,
      admin: false,
      superadmin: false
    };

    const path = 'Usuarios';
    const id = user.user.uid;
    await this.authService.createUser(usuario, path, id);
    await this.contacto(usuario.email, usuario.nombre, usuario.tel);
    await loading.dismiss();


    if (user) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      this.showAlert('Bienvenido a KuPon', 'Cuenta creada con exito.');
    } else {
      this.showAlert('Registro fallido', 'Por favor intente denuevo');
    }
  }


  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  back() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  async check() {

    const codigo = this.userInfo.code.toLowerCase();

    if (this.codes[codigo]) {
      this.userInfo.empresa = this.codes[codigo];
      this.register();
    } else if (codigo === ''){
      this.register();
    } else {
      this.showAlert('Codigo erroneo', 'Por favor intente denuevo');
    }
  }

  toggleShow() {
    this.hide = !this.hide;
  }

  contacto(email, nombre, tel) {
    this.mns.mailContactCreation(email, nombre, tel);
  }
}
