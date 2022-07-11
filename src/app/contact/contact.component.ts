import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Form model that hosts the Reactive form
  feedbackForm!: FormGroup;
  // corresponding data model, can be fetched from a server
  feedback!: Feedback; 
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
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
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    // It so happens that the form model is exactly the same as the data models
    // The value property allows us to retrieve the values of a form
    // If the data model is different from the form model, we have to manually map the properties
    this.feedback = this.feedbackForm.value;

    console.log(this.feedback);
    this.feedbackForm.reset(); // resets the form into a normal state, removing all the entries in the form view
  }
}
