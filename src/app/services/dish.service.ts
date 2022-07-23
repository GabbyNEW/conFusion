// We can inject services into our app module and make use of it in our componenets (injectable)
import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})

// The services has been updated to export Observables
// Where within our components, we can subscribe to these observables
// and obtain the data required for rendering the views
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

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
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleErrror));
  }

  getDish(id: String): Observable<Dish> {
    // Arrow functions are used here
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleErrror));
}

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleErrror));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish | undefined): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<Dish>(baseURL + 'dishes/' + dish?.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleErrror));
  }

}