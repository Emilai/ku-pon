import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit() {
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();
    }



  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true});
  }

  premium() {
    console.log(this.authService.userInfo);
      }

}
