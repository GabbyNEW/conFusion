// This is a router module (generated via cli using 'ng g module app-routing')
// It is standard practice to put the router module into its own separate module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular already provides a router module for us;
// But it is standard practice to have to router module as a separate module
import { Router, RouterModule, Routes } from '@angular/router';
import { routes } from './routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // The router module takes a parameter (via forRoot) containing the routes
  ],
  // We want to export our Router module to our App module so that it can make use of it
  exports: [
    RouterModule // We make our RouterModule available for the app module
  ]
})

export class AppRoutingModule { }
