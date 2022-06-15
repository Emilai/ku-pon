import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { CardService } from 'src/app/services/card.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: any;
  categories: Observable<any>;

  constructor(private dataService: DataService, public cardService: CardService, public authService: AuthService) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit() {
    this.categories = this.dataService.getCategories();
    // console.log(this.categories);
    this.user = this.authService.auth.currentUser;
    await this.authService.userData();
  }


  categorieFilter(categorie){
    console.log(categorie);
    // this.cardService.categ = categorie;
  }

}

