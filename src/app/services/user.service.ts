import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: any;

  constructor() {
    this.userList = firebase.database().ref('/userProfile');

  }

  getUserDetails() {
    return this.userList.child(firebase.auth().currentUser.uid);
  }

  getUserById(id:string) {
    return this.userList.child(id);
  }
}
