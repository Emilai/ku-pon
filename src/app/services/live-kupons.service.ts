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


  constructor(public auth: Auth, private firestore: AngularFirestore, private datePipe: DatePipe) {
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

      // eslint-disable-next-line max-len
      const liveKupons = this.firestore.collection('liveKupons', ref => ref.where('usuario', '==', userMail).where('validDate', '>', this.myDate));
      return liveKupons.snapshotChanges();

    } catch (error) {
      console.log(error);
    }
  };

  async checkLiveKupons(comercioCode) {
    try {
      const liveKuponschecked =
      this.firestore.collection('liveKupons', ref => ref.where('comercioCode', '==', comercioCode)).snapshotChanges();
      return liveKuponschecked;

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


  async getOnlineCode(comercioCode, onlineCode) {
    try {
       // eslint-disable-next-line max-len
       const actualCodes = await (await this.firestore.collection('onlineCodes').doc('comercios').collection(comercioCode).doc(onlineCode).get().toPromise()).data().codigos;
      const docRef = this.firestore.collection('onlineCodes').doc('comercios').collection(comercioCode).doc(onlineCode);
      let actualCode;
      if (Array.isArray(actualCodes) && actualCodes.length > 0) {
        actualCode = actualCodes[0];
        actualCodes.shift();
        await docRef.set({ codigos: actualCodes });

      } else {
        console.error('actualCodes no es un array o no tiene elementos.');
        actualCode = 'A la brevedad te enviaremos tu código';
      }
       return actualCode;
    } catch (error) {
      console.log(error);
    }
  };


  }
