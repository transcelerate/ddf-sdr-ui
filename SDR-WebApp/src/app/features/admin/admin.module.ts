import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminModuleConstants } from './admin-module.constants';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [AdminModuleConstants.MODULE_IMPORTS],
  declarations: AdminModuleConstants.MODULE_COMPONENTS,
  providers: [AdminModuleConstants.MODULE_PROVIDERS],
  exports: AdminModuleConstants.MODULE_COMPONENTS,
  entryComponents: AdminModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class AdminModule {}
