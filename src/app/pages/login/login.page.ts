import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, isPlatform, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  credentials: FormGroup;

  user: any;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {

    // GoogleAuth.initialize({
    //   clientId: '330398142779-g8fpn595stbm3qjvua6bu416orbufrgv.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'],
    //   grantOfflineAccess: true,
    // });
  }


  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  async register() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } else {
      this.showAlert('Cuenta Invalida', 'Por favor intente denuevo');
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




}
