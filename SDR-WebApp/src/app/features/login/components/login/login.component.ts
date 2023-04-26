import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthError,
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
          this.authToken = result.accessToken;
        },
        error: (error) => {
          const authErr = error as AuthError;
          if (authErr) {
            if (authErr.errorCode == 'user_cancelled') {
              this.showError = false;
            } else if (authErr.errorCode == 'interaction_in_progress') {
              alert(
                'Login is currently in progress in another window. Please complete or cancel that flow before requesting token again.'
              );
              this.showError = false;
            } else {
              this.showError = true;
            }
          }
        },
      });
    }
  }
}
