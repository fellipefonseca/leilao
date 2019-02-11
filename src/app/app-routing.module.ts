import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LeilaoComponent } from './pages/leilao/leilao.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'cadastrar', component: SignupComponent },
      { path: 'inicio', component: HomeComponent },
      { path: 'adicionar', component: AddProductComponent },
      { path: 'leilao/:id', component: LeilaoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
