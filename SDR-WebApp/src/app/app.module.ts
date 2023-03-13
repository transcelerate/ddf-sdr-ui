import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModuleConstants } from './app-module.constants';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [AppModuleConstants.MODULE_IMPORTS, BrowserAnimationsModule],
  declarations: [AppModuleConstants.MODULE_DECLARATION],
  providers: [AppModuleConstants.MODULE_PROVIDERS],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
