// We can inject services into our app module and make use of it in our componenets (injectable)
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// The services has been updated to export Observables
// Where within our components, we can subscribe to these observables
// and obtain the data required for rendering the views
export class DishService {

  constructor() { }

  // Our dish service is configured to supply the DISHES object to any other part of our application that needs it.
  // To make this happen, we need to inject this service.

  // FUNCTIONAL REACTIVE PROGRAMMING IN ANGULAR:
  // We let our services return observables because
  // when we update services to use HTTP to fetch data from the server,
  // HTTP methods will return observables.
  // The services can simply pass the observables onto the components and 
  // let the components subscribe to these observables and make use of the data they obtain

  // CONTEXT: Originally we make use of Promises in our services. Now we use RxJS to demonstrate reactive programming in Angular.

  // We use the of operator to create an RxJS Observable
  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: String): Observable<Dish> {
    // Arrow functions are used here
    return of(DISHES.filter((dish) => (dish.id == id))[0]).pipe(delay(2000));
}

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }

}