import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  credentials: FormGroup;
  userInfo= {
    nombre: '',
    tel: undefined
  };

  constructor(

    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);

    const usuario: Usuario = {
      id: user.user.uid,
      nombre: this.userInfo.nombre,
      email: user.user.email,
      tel: this.userInfo.tel,
      img: '',
      empresa: '',
      premium: false,
      admin: false,
      superadmin: false
    };

    const path = 'Usuarios';
    const id = user.user.uid;
    await this.authService.createUser(usuario, path, id);
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


}
