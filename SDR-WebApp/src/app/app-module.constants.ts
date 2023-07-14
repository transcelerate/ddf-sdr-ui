import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {
  PublicClientApplication,
  IPublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalModule,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalInterceptorConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular'; // Import MsalInterceptor
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
// import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { AuthGuardService } from './auth-guard.service';
import { SoaComponent } from './features/soa/soa.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
export class AppModuleConstants {
  static MODULE_IMPORTS = [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MsalModule,
    AgGridModule.withComponents([]),
    MonacoEditorModule,
    TabsModule.forRoot(),
  ];

  static MODULE_PROVIDERS = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalGuard,
    MsalService,
    MsalBroadcastService,
    AuthGuardService,
  ];

  static MODULE_DECLARATION = [AppComponent, SoaComponent];
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      redirectUri: environment.redirectUrl,
      navigateToLoginRequestUrl: false,
      postLogoutRedirectUri: environment.loginUrl,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: true, // Set to true for Internet Explorer 11
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel: LogLevel, message: string) {
          //console.log(message);
        },
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
      allowRedirectInIframe: true,
    },
  });
}
export const protectedResources = {
  profileApi: {
    endpoint: environment.BASE_URL,
    scopes: [environment.Audience],

    //scopes: ["api://Enter_the_Application_Id_of_Service_Here/.default"],
  },
};
// export const loginRequest = {
//   scopes: [...protectedResources.profileApi.scopes]
// };

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  if (!environment.bypassAuth) {
    protectedResourceMap.set(
      protectedResources.profileApi.endpoint,
      protectedResources.profileApi.scopes
    );
  }

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [environment.Audience],
    },
  };
}
