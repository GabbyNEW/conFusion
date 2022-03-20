// THis is the root component

// This allows us to define a component decorator and apply it to our class
import { Component } from '@angular/core';

// Component decorator (metadata), takes a Javascript object as a parameter
@Component({
  // at index.html file, we included an element called 'app-root'
  // selector for the component which is used within our template to specify 
  // where the view corresponding to this component should be displayed in the browser
  selector: 'app-root',
  // points to an html file that contains a template that corresponds to this component
  templateUrl: './app.component.html',
  // template: `<h1>{{title}}</h1> (inline templates and css work too)
  // contains all the scss code that can be used for css styling for our component's template
  styleUrls: ['./app.component.scss']
})

// A component is just a Javascript/Typescript class
// We use export so that this component can be imported into an app module
export class AppComponent {
  // Properties and methods defined in the class 
  // can be accessed by the templates (data-binding)
  title = 'conFusion';
}
