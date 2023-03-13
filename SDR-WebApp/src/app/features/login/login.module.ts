import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginModuleConstants } from './login-module.constants';

@NgModule({
  imports: [LoginModuleConstants.MODULE_IMPORTS],
  declarations: LoginModuleConstants.MODULE_COMPONENTS,
  providers: [LoginModuleConstants.MODULE_PROVIDERS],
  exports: LoginModuleConstants.MODULE_COMPONENTS,
  entryComponents: LoginModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class LoginModule {}
