// We can inject services into our app module and make use of it in our componenets (injectable)
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes'; 

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  // Our dish service is configured to supply the DISHES object to any other part of our application that needs it.
  // To make this happen, we need to inject this service.
  getDishes(): Dish[] {
    return DISHES;
  }
}
