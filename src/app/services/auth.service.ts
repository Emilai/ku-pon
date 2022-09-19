import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthData: any;
  userInfo: any = 'user info vacio';

  constructor(public auth: Auth, private firestore: AngularFirestore, private router: Router) {
   }

  async register({email, password}) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.userAuthData = user;
      return user;
    } catch (e) {
      return null;
    }
    }

  async login({email, password}) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.userAuthData = user;
      return user;
    } catch (e) {
      return null;
    }
}
  logout() {
    return signOut(this.auth);
   }

   async forgotPass(email) {

    try {
      return sendPasswordResetEmail(this.auth, email).then(() => {
        console.log('Password Reset send');
      });
    } catch (err) {
      console.log(err);
    }
   }

  createUser(data: any, path: string, id: string) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }



 async userData() {
    try {
      await this.firestore.collection('Usuarios').doc(this.auth.currentUser.uid).get().subscribe(userData =>{
        const userInfo = userData.data();
        this.userInfo = userInfo;
        return userInfo;
      });

    } catch (error) {
      console.log(error);
    }
  };

  async userData2() {
    try {
      // await this.firestore.collection('Usuarios').doc(this.auth.currentUser.uid).get().subscribe(userData => {
      //   const userInfo = userData.data();
      //   this.userInfo = userInfo;
      //   console.log(this.userInfo);
      //   return userInfo;
      // });
      return await this.firestore.collection('Usuarios').doc(this.auth.currentUser.uid).get();

      //probar retornando promesa y no la data o subscribe en RJX

    } catch (error) {
      console.log(error);
    }
  };

  async update(collection, id, data) {
    try {
      return await this.firestore.collection(collection).doc(id).set(data);
    } catch(error) {
      console.log('error en update ', error);
    }
  }

  }

