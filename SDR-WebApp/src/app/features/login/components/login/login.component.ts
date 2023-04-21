import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { EventMessage, EventType, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public router: Router
  ) {}
  ngOnInit() {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: any) => {
        if (result?.payload?.accessToken) {
          this.router.navigate(['home']);
        }
      });
    this.authService.logoutRedirect({
      onRedirectNavigate: () => {
        // Return false to stop navigation after local logout
        return false;
      },
    });
  }
  /**
   *Login on click of link
   */
  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
}
