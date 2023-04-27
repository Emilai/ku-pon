/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Kupon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  myDate = new Date();
  private _storage: Storage | null = null;
  private _localKupon: Kupon[] = [];


  constructor(private storage: Storage) {
    this.init();
   }

   get getLocalKupons() {
     return [ ...this._localKupon];
   }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
    this.loadFavourites();
  }

  async saveRemoveCard( kupon: Kupon) {

    const exists = this._localKupon.find( localKupon => localKupon.titulo === kupon.titulo );
    if (exists) {
      this._localKupon = this._localKupon.filter( localKupon => localKupon.titulo !== kupon.titulo);
    } else {
      kupon.validDate = new Date(kupon.validDate.seconds * 1000 + kupon.validDate.seconds / 1000000);
      this._localKupon = [kupon, ...this._localKupon];
    }


    this._storage.set('kupones', this._localKupon );
  }

  async loadFavourites() {
    try {
      const articles = await this._storage.get('kupones');
      this._localKupon = articles || [];

    } catch(error) {

    }
  }

  isInFav( kupon: Kupon) {
    return !!this._localKupon.find( localKupon => localKupon.id === kupon.id);
  }
}
