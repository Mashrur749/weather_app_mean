import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistrationFormComponent } from './forms-component-group/registration-form/registration-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './forms-component-group/login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { WeatherDailyComponent } from './dashboard-component-group/weather-daily/weather-daily.component';
import { WeatherHourlyComponent } from './dashboard-component-group/weather-hourly/weather-hourly.component';
import { WeatherCurrentComponent } from './dashboard-component-group/weather-current/weather-current.component';
import { DashboardComponent } from './dashboard-component-group/dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    NavBarComponent,
    LoginFormComponent,
    HomeComponent,
    WeatherDailyComponent,
    WeatherHourlyComponent,
    WeatherCurrentComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
