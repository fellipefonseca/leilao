import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userList: any;

  constructor() {
    this.userList = firebase.database().ref('/userProfile');

  }

  registerUser(credential: any) {
    return firebase.auth().createUserWithEmailAndPassword(credential.email, credential.password);
  }

  addUser(user: any) {
    return this.userList.child(firebase.auth().currentUser.uid).set(user);
  }



  loginWithCredentials(credential: any) {
    return firebase.auth().signInWithEmailAndPassword(credential.email, credential.password);
  }

  logout() {
    firebase.auth().signOut();
  }

}
