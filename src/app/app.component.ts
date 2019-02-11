import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Leilao';

  constructor(private router: Router) {
    console.log(firebase.database['ServerValue']['TIMESTAMP']);
    
    firebase.auth().onAuthStateChanged(user => {      
      if (user == null) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/inicio']);
      }
    });
  }
}
