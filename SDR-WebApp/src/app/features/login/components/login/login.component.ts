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
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';

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
            if (authErr.errorCode == configList.USER_CANCELLED_ERROR_CODE) {
              this.showError = false;
            } else if (authErr.errorCode == configList.INTERACTION_ERROR_CODE) {
              alert(configList.AUTH_IN_PROGRESS_ERROR);
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
