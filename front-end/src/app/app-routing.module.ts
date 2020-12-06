import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard-component-group/dashboard/dashboard.component';
import {RegistrationFormComponent} from './forms-component-group/registration-form/registration-form.component'
import {LoginFormComponent} from './forms-component-group/login-form/login-form.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { GuardAuthService } from './guard-auth.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardAuthService] },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', redirectTo: '/home' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];




@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
