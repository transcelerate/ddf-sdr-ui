import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {
  MsalModule,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalService,
} from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
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
    MsalGuard,
    MsalService,
    MsalBroadcastService,
  ];

  static MODULE_DECLARATION = [AppComponent, SoaComponent];
}

export const protectedResources = {
  profileApi: {
    endpoint: environment.BASE_URL,
    scopes: [environment.Audience],

    //scopes: ["api://Enter_the_Application_Id_of_Service_Here/.default"],
  },
};
