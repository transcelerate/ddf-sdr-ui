import { NgModule } from '@angular/core';
import { ReportsModuleConstants } from './reports-module.constants';

@NgModule({
  imports: [ReportsModuleConstants.MODULE_IMPORTS],
  declarations: ReportsModuleConstants.MODULE_COMPONENTS,
  providers: [ReportsModuleConstants.MODULE_PROVIDERS],
  exports: ReportsModuleConstants.MODULE_COMPONENTS,
  entryComponents: ReportsModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class ReportsModule {}
