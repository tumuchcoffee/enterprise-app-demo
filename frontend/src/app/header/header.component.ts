import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AccountInfo } from "@azure/msal-common";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = "Enterprise Demo";
  loggedIn: boolean = false;
  activeUser: any = null;
  
  constructor(private authService: AuthenticationService) { 
    this.authService.LoginChange.subscribe((value) => {
      this.loggedIn = value;
      let users = this.authService.getAccounts();
      if (users.length > 0)
        this.activeUser = users[0];
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authService.destroy();
  }
  
}
