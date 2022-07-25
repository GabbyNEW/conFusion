import { Component, OnInit, ViewChild } from '@angular/core'; // ViewChild allows us to access any of the child dom elements in the template
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { 
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    flyInOut()
  ]
})

export class ContactComponent implements OnInit {

  // Form model that hosts the Reactive form
  feedbackForm!: FormGroup;
  // corresponding data model, can be fetched from a server
  feedback!: Feedback | undefined; 
  feedbackCopy!: Feedback | undefined;
  errMess!: string;
  contactType = ContactType;

  showForm: Boolean = true;
  showSubmittedForm: Boolean = false;

  // Refer to the feedback form by giving it a template variable called fform
  // This allows us to access the template form and then reset it 
  @ViewChild('fform') feedbackFormDirective: any;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
  };

  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required',
      'pattern': 'Telephone number must contain only phone numbers.'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format.'
    }
  }

  constructor(private feedbackService: FeedbackService,
    private fb: FormBuilder) {
    // When this class is built, the form will be created
    this.createForm();
   }

  ngOnInit(): void {
  }

  // When this method is called, the reactive form will be created in the code here
  // This needs to be mapped into the view (to the template)
  createForm() {
    // the group methods allows us to define a FormGroup
    this.feedbackForm = this.fb.group({
      // We can construct parts of the form here
      // We can also include various form controls here
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    // valueChanges observable, can be subscribed (what should be done when the valueChanges)
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) return;
    const form = this.feedbackForm;

    for (const field in this.formErrors){
      // Clear earlier attached error messages
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error messages
        this.formErrors[field] = '';
        const control = form.get(field);

        // Check if there are invalid entries, then add error messages
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
    console.log(this.feedbackFormDirective);
    if (!this.feedbackForm) return;
    // It so happens that the form model is exactly the same as the data models
    // The value property allows us to retrieve the values of a form
    // If the data model is different from the form model, we have to manually map the properties
    this.feedback = this.feedbackForm.value;
    this.feedbackCopy = this.feedbackForm.value;
    this.showForm = false;
    this.feedbackFormDirective.resetForm();

    // post feedback
    this.feedbackService.submitFeedback(this.feedbackCopy)
      .subscribe(feedback => {
        this.feedback = feedback;
        this.feedbackCopy = feedback;
        this.showForm = false;
        this.showSubmittedForm = true;
        setTimeout(() => {
          this.resetFormLocal();
          this.showForm = true;
          this.showSubmittedForm = false;
        }, 5000);
      },
        errmess => {this.feedback = undefined, this.feedbackCopy = undefined, this.errMess = <any>errmess}
      );

  }

  resetFormLocal() {
    // resets the form into a normal state, removing all the entries in the form view
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    }); 
  }
}
