import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { NavbarComponent } from './components/dashboard/navbar/navbar.component'; 
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { InicioComponent } from './components/dashboard/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //NavbarComponent,
    LoginComponent,
    //InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
