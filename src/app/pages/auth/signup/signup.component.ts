import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(public router: Router, private formBuilder: FormBuilder, private authProvider: AuthService) {

    this.formGroup = this.formBuilder.group({
      'login': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(24)])]
    });
  }


  ngOnInit() {

  }

  signUp(value: any) {
    console.log(value);
    this.authProvider.registerUser(value).then((res) => {
      this.authProvider.addUser(value).then(() => {
        this.router.navigate(['/inicio']);
      });

    })
  }

}
