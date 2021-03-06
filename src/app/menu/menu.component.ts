// This component is generated using 'ng generate component menu'
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish' // so we can use it as a type for a variable
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})

export class MenuComponent implements OnInit {
  dishes!: Dish[] | undefined;
  errMess: string | undefined;

  // When this component is created, the DishService 
  // that you injected in the app module will be instantiated and will be made available here.
  constructor(private dishService: DishService,
    @Inject('BaseURL') public BaseURL: any) { } // the BaseURL is injected into a component; when you have a value, you inject the value using @Inject

  // Lifecycle method
  // Will be executed by the Angular framework
  // whenever this component is instantiated.
  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe((dishes: Dish[] | undefined) => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }

  // Handler (view to data source binding)
  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }

}
