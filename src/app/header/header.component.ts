import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // This is a service that enables us to open the component is a dialog component
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    // Supply a component that is going to act as a view for the dialog 
    // to be overlaid on top of the current webview
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'})
  }

}
