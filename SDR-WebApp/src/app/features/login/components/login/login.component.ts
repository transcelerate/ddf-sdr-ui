import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionType,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  showError = false;
  authToken: string;
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService
  ) {}
  ngOnInit() {
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

  getToken() {
    if (this.msalGuardConfig.authRequest) {
      this.msalGuardConfig.interactionType = InteractionType.Popup;
      var request = this.msalGuardConfig.authRequest as PopupRequest;
      this.authService.acquireTokenPopup(request).subscribe({
        next: (result: AuthenticationResult) => {
          this.showError = false;
          console.log(result.accessToken);

          this.authToken = result.accessToken;
        },
        error: (error) => {
          this.showError = true;
        },
      });
    }
  }
}
