import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kupon } from '../interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Star {
  userId: any;
  kuponId: any;
  value: number;
}
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

  ///////////////////// Rating ///////////////////

  getUserStars(userId) {
    const starsRef = this.firestore.collection('stars', ref => ref.where('userId', '==', userId));
    return starsRef.valueChanges();
  }

  getKuponStars(kuponId) {
    const starsRef = this.firestore.collection('stars', ref => ref.where('kuponId', '==', kuponId));
    return starsRef.valueChanges();
  }

  setStar(userId, kuponId, value) {

    const star: Star = { userId, kuponId, value };
    const starPath = `stars/${star.userId}_${star.kuponId}`;

    return this.firestore.doc(starPath).set(star);
  }

}
