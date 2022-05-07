import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
// Params = Gives you access to the Router parameters
// ActivatedRoute = Fetch the Route value
import { Params, ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common'; // Track the location of the page (browser history)
import { DishService } from '../services/dish.service';

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
  dish!: Dish;

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    // When you click on a dish from the menuComponent, 
      // the router link will pass the dish id to the Router as RouterParameter,
      // and that value will become available here in dishdetailComponent 
      // by accessing the ActivatedRoute service.

      // You can now ues that value to query the dish here.

    // Fetches the id from the route parameter. Which dish should be shown?
    let id = this.route.snapshot.params['id'];
    this.dish = this.dishService.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }

}
