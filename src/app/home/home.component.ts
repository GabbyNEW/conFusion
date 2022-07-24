import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})

export class HomeComponent implements OnInit {

  dish!: Dish | undefined;
  dishErrMess!: string;
  promotion!: Promotion | undefined;
  leader!: Leader | undefined;

  constructor(private dishService: DishService,
     private promotionService: PromotionService,
     private leaderService: LeaderService,
     @Inject('BaseURL') public BaseURL: any) { }

  // Lifecycle method
  // Will be executed by the Angular framework
  // whenever this component is instantiated.
  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe((dish: Dish | undefined) => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion: Promotion | undefined) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader: Leader | undefined) => this.leader = leader);
  }

}
