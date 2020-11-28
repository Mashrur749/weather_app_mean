import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { WeatherDailyComponent } from './weather-daily/weather-daily.component';
import { WeatherHourlyComponent } from './weather-hourly/weather-hourly.component';
import { WeatherCurrentComponent } from './weather-current/weather-current.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
