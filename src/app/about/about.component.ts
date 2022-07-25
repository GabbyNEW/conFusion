import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})

export class AboutComponent implements OnInit {
  leaders!: Leader[] | undefined;
  leaderErrMess!: string;

  constructor(private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: any) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe((leaders: Leader[] | undefined) => this.leaders = leaders,
    errmess => this.leaderErrMess = <any>errmess);
  }

}
