import { Route, Routes } from "@angular/router";

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { Component } from "@angular/core";

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    // Router parameter, navigate to this view with a parameter called id.
        // The id parameter will be passed to the dishDetail Component.
    {path: 'dishdetail/:id', component: DishdetailComponent},
    {path: 'contactus', component: ContactComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'} // default route
];