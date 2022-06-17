import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthData: any;
  userInfo: any = 'user info vacio';

  constructor(public auth: Auth, private firestore: AngularFirestore) {
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

  }

