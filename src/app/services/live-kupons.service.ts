import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LiveKuponsService {

  liveKupons: any;
  chekedKupons: any;
  myDate = new Date();
  currentDate: any;
  companyKupons: any;


  constructor(public auth: Auth, private firestore: AngularFirestore, private datePipe: DatePipe ) {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd-HH-m-s');
  }

  createliveKupon(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const collection = this.firestore.collection('liveKupons');
    return collection.doc(this.auth.currentUser.email).collection('live').doc(data.code).set(data);
  }

  async getliveKupons() {
    try {
      const liveKupons = this.firestore.collection('liveKupons').doc(this.auth.currentUser.email).collection('live').snapshotChanges();
      this.liveKupons = liveKupons;
      return liveKupons;

    } catch (error) {
      console.log(error);
    }
  };

  async checkLiveKupons(email, id) {
    try {
      const checkedKupons = this.firestore.collection('liveKupons').doc(email).collection('live').doc(id).get();
      this.chekedKupons = checkedKupons;
      return checkedKupons;

    } catch (error) {
      console.log('error por campo vacio en liveKuponService checkliveKupons', error);
    }

  }

  async deleteUsedKupon(email, id) {
    try {
      this.firestore.collection('liveKupons').doc(email).collection('live').doc(id).delete();
      console.log('deleted');
    } catch (err) {
      console.log('Error on deleting KuPon: ', err);
    }
  }

  registerUsedKupon(data: any, user: string){
    try {
      const collection = this.firestore.collection('usedKupons');

      collection.doc(user).collection('usedKupons').doc(this.currentDate + '::' + data.code).set(data); //ver con Garra

      console.log('registered Kupon');
    } catch (err) {
      console.log('Error on registering KuPon: ', err);
    }
  }

  async getCompanyKupons(code) {
    try {
      const companyKupons = this.firestore.collection('empresas').doc(code).collection('beneficios').snapshotChanges();
      this.companyKupons = companyKupons;
      return companyKupons;

    } catch (error) {
      console.log(error);
    }
  };

  registerReservation(data: any) {
    try {
      const collection = this.firestore.collection('reservations');
      collection.doc(this.auth.currentUser.email).collection('reservedKupons').doc(this.currentDate + '::' + data.code).set(data);
      console.log('reserved Kupon');
    } catch (err) {
      console.log('Error on registering KuPon: ', err);
    }
  }
}
