import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModuleConstants } from './app-module.constants';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// export const protectedResources = {
//   profileApi: {
//     endpoint: "https://apps-sdr-qa-eastus-002.azurewebsites.net//1/elements",
//     scopes: ["api://0a532207-4125-40ea-b355-373685a4ab11/api-access"],
 
    
//     //scopes: ["api://Enter_the_Application_Id_of_Service_Here/.default"],
//   },
// }
@NgModule({

  imports: [AppModuleConstants.MODULE_IMPORTS, BrowserAnimationsModule],
  declarations: [AppModuleConstants.MODULE_DECLARATION],
  providers: [AppModuleConstants.MODULE_PROVIDERS],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
  // entryComponents: [AppModuleConstants.MODULE_ENTRY_COMPONENTS]
})
export class AppModule { }
