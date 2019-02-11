import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any;
  constructor(private userProvider: UserService, private authProvider: AuthService, private router: Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.userProvider.getUserDetails().on('value', (snapshot) => {
         this.user = snapshot.val();
        });
      }
    });
  }

  logout() {
    this.authProvider.logout();
  }

  addItem() {
    this.router.navigate(['/adicionar']);
  }
}
