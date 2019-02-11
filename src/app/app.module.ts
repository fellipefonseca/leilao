import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './services/user.service';
import { HeaderComponent } from './shared/header/header.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ImageUploadModule } from 'ng2-imageupload';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { LeilaoComponent } from './pages/leilao/leilao.component';

var config = {
  apiKey: "AIzaSyCDRlt4tb2eSzfzdgStaX4DfY_taA7VpEU",
  authDomain: "leilao-c5075.firebaseapp.com",
  databaseURL: "https://leilao-c5075.firebaseio.com",
  projectId: "leilao-c5075",
  storageBucket: "leilao-c5075.appspot.com",
  messagingSenderId: "817799870894"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    HeaderComponent,
    AddProductComponent,
    LeilaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features    
    ImageUploadModule,
  ],
  providers: [
    AuthService,
    UserService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(config);
  }
}
