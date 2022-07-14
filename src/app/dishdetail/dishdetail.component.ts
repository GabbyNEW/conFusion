import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
// Params = Gives you access to the Router parameters
// ActivatedRoute = Fetch the Route value
import { Params, ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common'; // Track the location of the page (browser history)
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  // @Input: A way for you to supply information into a component from another component.
  // You bind a property in the template of the other component,
  // and that will be available as input to this component.
  // @Input() // Automatically refreshes the view when a change in dish value happens.
  dish!: Dish | undefined;
  dishIds!: string[];
  prev!: string;
  next!: string;

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    // When you click on a dish from the menuComponent, 
    // the router link will pass the dish id to the Router as RouterParameter,
    // and that value will become available here in dishdetailComponent 
    // by accessing the ActivatedRoute service.

    // Fetches the id from the route parameter. Which dish should be shown?
    // Whenever the params observable changes value,
    // the switchMap operator takes the params value and do a getDish
    // (anytime the observable changes, the dish will be updated)
    // and will be available as an Observable that is emitted by doing a switchMap operator
    // on this observable.
    // Then, a new observable (getDish) has been created, where we subscribe to it
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish: Dish | undefined) => { this.dish = dish; this.setPrevNext(dish?.id); });
  }

  setPrevNext(dishId: string | undefined) {
    const index = this.dishIds.indexOf(dishId!);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

}
