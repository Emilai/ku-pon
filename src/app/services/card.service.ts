import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<any[]>('../../assets/kupones.json');
  }

  getSliders() {
    return this.http.get<any[]>('../../assets/sliders.json');
  }
}
