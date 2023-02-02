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
  userUsedKupons: any;


  constructor(public auth: Auth, private firestore: AngularFirestore, private datePipe: DatePipe ) {
    this.currentDate = this.datePipe.transform(this.myDate, 'yyyy/MM/dd, HH:mm');
  }

  // createliveKupon(data: any) {
  //   // eslint-disable-next-line @typescript-eslint/no-shadow
  //   const collection = this.firestore.collection('liveKupons');
  //   return collection.doc(this.auth.currentUser.email).collection('live').doc(data.code).set(data);
  // }

  createliveKupon2(data: any, id) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const collection = this.firestore.collection('liveKupons');
    return collection.doc(id).set(data);
  }

  async getliveKupons(userMail) {

    try {

      const liveKupons = this.firestore.collection('liveKupons', ref => ref.where('usuario', '==', userMail));
      return liveKupons.snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  async checkLiveKupons(comercioCode) {
    try {
      const liveKuponschecked =
      this.firestore.collection('liveKupons', ref => ref.where('comercioCode', '==', comercioCode)).snapshotChanges();
      console.log(liveKuponschecked);
      return liveKuponschecked;
      // const checkedKupons = this.firestore.collection('liveKupons').doc(email).collection('live').doc(id).get();
      // this.chekedKupons = checkedKupons;
      // return checkedKupons;

    } catch (error) {
      console.log('error por campo vacio en liveKuponService checkliveKupons', error);
    }

  }

  async deleteUsedKupon(id) {
    try {
      this.firestore.collection('liveKupons').doc(id).delete();
      console.log('deleted');
    } catch (err) {
      console.log('Error on deleting KuPon: ', err);
    }
  }

  registerUsedKupon(data: any){
    try {
      const collection = this.firestore.collection('kuponesUsados');

      collection.doc().set(data);

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

  async getUsedKupons(userMail) {

    try {
      return await this.firestore.collection(`kuponesUsados`, ref => ref.where('usuario', '==', userMail)).snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };
}
