// This is the root module for your Angular app

// A module is a mechanism that groups components, directives,
// pipes, and services that are related.
// They can be combined with other modules to create an app).

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';

import { DishService } from './services/dish.service';

// A decorator is a function that modifies Javascript classes
// NgModule allows you to specify some details about this app module
@NgModule({
  declarations: [ // Declares the view classes that belong to this particular module
  // The view classes for an Angular module would be in the form of 
  // either components, directives, and pipes.
    AppComponent, MenuComponent, DishdetailComponent
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
    FlexLayoutModule
  ],
  providers: [
    DishService
  ], // What services this module will make use of
  bootstrap: [AppComponent] // the app component is the root component
})

export class AppModule { }
// Typescript adds Classes to your typical Javascript code