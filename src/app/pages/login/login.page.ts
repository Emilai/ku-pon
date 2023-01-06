import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  credentials: UntypedFormGroup;

  user: any;
  forgetEmail = '';
  forgetBox = false;
  hide = true;

  constructor(
    private fb: UntypedFormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}


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

  passwordReset() {
    this.forgetBox = !this.forgetBox;
  }
  async forgotPassword(email) {
    try {
      await this.authService.forgotPass(email);
      this.showAlert('Mail de reseteo de Password enviado', 'Checkea tu email');
      this.forgetBox = !this.forgetBox;

    } catch (err){
      console.log('error> ', err);
      this.showAlert('Usuario Incorrecto', 'Checkea tu email');
    }
  }

  toggleShow() {
    this.hide = !this.hide;
  }

}
