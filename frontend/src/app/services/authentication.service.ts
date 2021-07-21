import { Inject, Injectable } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject, Observable, Observer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _destroying$ = new Subject<void>();
  public IsLoggedIn: boolean = false;

  public LoginChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { 
      this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setIsLoggedIn();
      });
      this.LoginChange.subscribe((value) => {
        this.IsLoggedIn = value;
      });
    }

    private setIsLoggedIn() {
      this.LoginChange.next(this.authService.instance.getAllAccounts().length > 0);
    }

    public getAccounts() {
      return this.authService.instance.getAllAccounts();
    }
    
    public getActiveAcount() {
      return this.authService.instance.getActiveAccount();
    }
    
    login() {
      if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        if (this.msalGuardConfig.authRequest){
          this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
            .subscribe((response: AuthenticationResult) => {
              this.authService.instance.setActiveAccount(response.account);
            });
          } else {
            this.authService.loginPopup()
              .subscribe((response: AuthenticationResult) => {
                this.authService.instance.setActiveAccount(response.account);
              });
        }
      } else {
        if (this.msalGuardConfig.authRequest){
          this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
        } else {
          this.authService.loginRedirect();
        }
      }
    }

    logout() {
      this.authService.logout();
    }

    destroy() {
      this._destroying$.next(undefined);
      this._destroying$.complete();
    }
}