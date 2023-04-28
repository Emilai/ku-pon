import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Kupon } from '../interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface Star {
  userId: any;
  kuponId: any;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class CardService {

  myDate = new Date();

  kuponData: Kupon;
  actualDate: any;

  constructor(private http: HttpClient, private firestore: AngularFirestore,
    private datePipe: DatePipe) {
    this.actualDate = this.datePipe.transform(this.myDate, 'yyyyMMddHHmm');
  }

  async getCards() {
    try {
      return await this.firestore.collection('kupones', ref => ref.where('validDate', '>', this.myDate)).snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  async getSliders() {
    try {
      // eslint-disable-next-line max-len
      return await this.firestore.collection('kupones', ref => ref.where('validDate', '>', this.myDate).where('slider', '==', true)).snapshotChanges();

    } catch (error) {
      console.log('error en getSliders desde card.service: ',error);
    }
  };

  async getEndorsers() {
    try {
      return await this.firestore.collection('endorser').snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  async getPromo() {
    try {
      return await this.firestore.collection('promo').snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  getOneCard() {
    return this.kuponData;
  }

  create(collection, data) {
    this.firestore.collection(collection).add(data);
  }

  updateKupon(id, data) {
    this.firestore.collection('kupones').doc(id).set(data);
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
