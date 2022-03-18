import { Component } from '@angular/core';

// Component decorator, takes a Javascript object as a parameter
@Component({
  // at index.html file, we included an element called 'app-root'
  // selector for the component which is used within our template to specify 
  // where the view corresponding to this component should be displayed in the browser
  selector: 'app-root',
  // points to an html file that contains a template that corresponds to this component
  templateUrl: './app.component.html',
  // contains all the scss code that can be used for css styling for our component's template
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conFusion';
}
