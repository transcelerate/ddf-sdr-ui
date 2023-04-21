import { NgModule } from '@angular/core';
import { AuthModuleConstants } from './auth-module.constants';

@NgModule({
  imports: [AuthModuleConstants.MODULE_IMPORTS],
  declarations: AuthModuleConstants.MODULE_COMPONENTS,
  providers: [AuthModuleConstants.MODULE_PROVIDERS],
  exports: AuthModuleConstants.MODULE_COMPONENTS,
  entryComponents: AuthModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class AuthModule {}
