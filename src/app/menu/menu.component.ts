// This component is generated using 'ng generate component menu'
import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish' // so we can use it as a type for a variable
import { DISHES } from '../shared/dishes'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = DISHES;

  selectedDish!: Dish;
  constructor() { }

  ngOnInit(): void {
  }

  // Handler (view to data source binding)
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}
