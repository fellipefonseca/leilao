import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder, private authProvider: AuthService) {

    this.formGroup = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])]
    });
  }

  ngOnInit() {    
  }

  signIn(value) {
    this.authProvider.loginWithCredentials(value).then(() => {
      this.router.navigate(['/inicio']);
    });
  }

}
