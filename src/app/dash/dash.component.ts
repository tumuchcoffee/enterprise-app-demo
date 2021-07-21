import { Component, OnInit } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {

  activeUser: string = '';

  constructor(private authService: AuthenticationService) { 
    this.authService.LoginChange.subscribe((value) => {
      let users = this.authService.getAccounts();
      if (users) {
        this.activeUser = JSON.stringify(users[0]);
      }
    });
  }

  ngOnInit(): void {
  }

}
