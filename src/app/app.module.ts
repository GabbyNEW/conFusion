// This is the root module for your Angular app

// A module is a mechanism that groups components, directives,
// pipes, and services that are related.
// They can be combined with other modules to create an app).

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';

import 'hammerjs';
import { LoginComponent } from './login/login.component';

// A decorator is a function that modifies Javascript classes
// NgModule allows you to specify some details about this app module
@NgModule({
  declarations: [ // Declares the view classes that belong to this particular module
  // The view classes for an Angular module would be in the form of 
  // either components, directives, and pipes.
    AppComponent, MenuComponent, DishdetailComponent, HeaderComponent, FooterComponent, HomeComponent, AboutComponent, ContactComponent, LoginComponent
  ],
  imports: [ // specifices which modules need to be imported to be used with this app module
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  providers: [
    DishService,
    PromotionService,
    LeaderService
  ], // What services this module will make use of
  entryComponents: [ // A dialog component must be declared as an entry component
    LoginComponent
  ],
  bootstrap: [AppComponent] // the app component is the root component
})

export class AppModule { }
// Typescript adds Classes to your typical Javascript code

// TODO: FontAwesome, Angular Material better integration