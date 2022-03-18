// This is the root module for your Angular app

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// A decorator is a function that modifies Javascript classes
// NgModule allows you to specify some details about this app module
@NgModule({
  declarations: [ // Declares the view classes that belong to this particular module
  // The view classes for an Angular module would be in the form of 
  // either components, directives, and pipes.
    AppComponent
  ],
  imports: [ // specifices which modules need to be imported to be used with this app module
    BrowserModule,
    AppRoutingModule
  ],
  providers: [], // What services this module will make use of
  bootstrap: [AppComponent] // the app component is the root component
})

export class AppModule { }
// Typescript adds Classes to your typical Javascript code