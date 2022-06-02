import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(){
    console.log('loging in');
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true});
  }

  premium() {
    console.log('premium');
  }
}
