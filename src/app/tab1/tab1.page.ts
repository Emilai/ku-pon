import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { CardService } from 'src/app/services/card.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  categories: Observable<any>;

  constructor( private dataService: DataService, public cardService: CardService) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.categories = this.dataService.getCategories();
    // console.log(this.categories);
  }

  categorieFilter(categorie){
    console.log(categorie);
    // this.cardService.categ = categorie;
  }

}

