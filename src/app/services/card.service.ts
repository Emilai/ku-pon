import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kupon } from '../interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class CardService {


  kuponData: Kupon;


  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  async getCards() {
    try {
      return await this.firestore.collection('kupones').snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  getSliders() {
    return this.http.get<any[]>('../../assets/sliders.json');
  }

  getOneCard() {
    return this.kuponData;
  }

  create(collection, data) {
    this.firestore.collection(collection).add(data);
  }


}
