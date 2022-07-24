import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
// Params = Gives you access to the Router parameters
// ActivatedRoute = Fetch the Route value
import { Params, ActivatedRoute } from '@angular/router'; 
import { Location } from '@angular/common'; // Track the location of the page (browser history)
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]
})

export class DishdetailComponent implements OnInit {
  // @Input: A way for you to supply information into a component from another component.
  // You bind a property in the template of the other component,
  // and that will be available as input to this component.
  @Input() // Automatically refreshes the view when a change in dish value happens.
  dish!: Dish | undefined;
  errMess: string | undefined;
  dishIds!: string[];
  prev!: string;
  next!: string;

  // Form model
  feedbackForm!: FormGroup;
  @ViewChild('fform') feedbackFormDirective: any;

  dishcopy!: Dish | undefined;
  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'First name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'First name must be at least 2 characters long.'
    }
  };

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: any) { 
      this.createForm();
    }

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
    this.route.params
      .pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe((dish: Dish | undefined | any) => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish?.id); this.visibility = 'shown'; },
       errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    })

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  // Monitor form input, display validation messages
  onValueChanged(data?: any) {
    if (!this.feedbackForm) return;
    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }

      }
    }

  }

  onSubmit() {
    let feedback = this.feedbackForm.value;

    // get current date 
    const date = new Date();
    let date_string = date.toDateString();
    feedback['date'] = date_string;
    console.log(feedback);

    // push comment
    this.dishcopy?.comments.push(feedback);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = undefined; this.dishcopy = undefined; this.errMess = <any>errmess;});

    // reset form
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      rating: 5,
      author: '',
      comment: '',
      date: ''
    });
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
