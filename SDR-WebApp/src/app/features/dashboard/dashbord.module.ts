import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardModuleConstants } from './dashboard-module.constants';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [DashboardModuleConstants.MODULE_IMPORTS],
  declarations: DashboardModuleConstants.MODULE_COMPONENTS,
  providers: [DashboardModuleConstants.MODULE_PROVIDERS],
  exports: DashboardModuleConstants.MODULE_COMPONENTS,
  entryComponents: DashboardModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class DashboardModule {}
