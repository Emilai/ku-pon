import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kupon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {


  kuponData: Kupon;


  constructor(private http: HttpClient) { }


  getCards() {
    return this.http.get<Kupon[]>('../../assets/kupones.json');
  }

  getSliders() {
    return this.http.get<any[]>('../../assets/sliders.json');
  }

  getOneCard() {
    return this.kuponData;
  }


}
