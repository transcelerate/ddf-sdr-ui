import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppModuleConstants } from './app-module.constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [AppModuleConstants.MODULE_IMPORTS, BrowserAnimationsModule],
  declarations: [AppModuleConstants.MODULE_DECLARATION],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
