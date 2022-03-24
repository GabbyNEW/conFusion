import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  // @Input: A way for you to supply information into a component from another component.
  // You bind a property in the template of the other component,
  // and that will be available as input to this component.
  @Input() // Automatically refreshes the view when a change in dish value happens.
  dish!: Dish;

  constructor() { }

  ngOnInit(): void {
  }

}
