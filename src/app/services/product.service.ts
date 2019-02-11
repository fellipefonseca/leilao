import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any;
  bids: any;

  _storagePath: string;
  constructor() {
    this.products = firebase.database().ref('/auctions');
    this.bids = firebase.database().ref('/bids');

    this._storagePath = 'https://firebasestorage.googleapis.com/v0/b/leilao-c5075.appspot.com/o/';

  }

  bid(bid: any) {
    return new Promise<any>((resolve, reject) => {
      
      
      firebase.database().ref('currentTime/').update({ time: firebase.database.ServerValue.TIMESTAMP }).then(() => {
        firebase.database().ref('currentTime/')
          .once('value')
          .then((data) => {
            var t = data.val()['time'];
            console.log('server time: ', new Date(t));
            if (firebase.auth().currentUser.uid == 'rfyJ4f1pDKRTr5rc9VsZ5c5zLaJ3') {
              setTimeout(() => {
                this.bids.child(bid.productKey).push({ time: t, value: bid.value, user: firebase.auth().currentUser.uid })
                resolve(true);
              }, 20000)
            } else {
              this.bids.child(bid.productKey).push({ time: t, value: bid.value, user: firebase.auth().currentUser.uid })
              resolve(true);
            }
          });
      })
    })
  }

  getBids(productId: string) {
    return this.bids.child(productId);
  }

  getHour() {
    return new Promise<any>((resolve, reject) => {
      firebase.database().ref('currentTime/').update({ time: firebase.database.ServerValue.TIMESTAMP }).then(() => {
        firebase.database().ref('currentTime/')
          .once('value')
          .then((data) => {
            var t = data.val()['time'];
            resolve(new Date(t));
          });
      })
    })
  }

  getProductDetails(id: string) {
    return this.products.child(id);
  }

  add(product: any, file: File) {
    product.user = firebase.auth().currentUser.uid;
    return this.products.push({ active: true, name: product.name, price: product.price, owner: product.user, finalTime: product.finalTime, description: product.description }).then((item) => {
      let upload = firebase.storage().ref().child('images/auctions/' + item.key).put(file);

      upload.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      }, (error) => {
        console.log(error);
      }, () => {
        return true;
      });

    });
  }

  inactive(id: string) {
    this.products.child(id).update({ 'active': false });
  }

  getAuctions() {
    return this.products;
  }

  storagePath() {
    return this._storagePath;
  }
}
