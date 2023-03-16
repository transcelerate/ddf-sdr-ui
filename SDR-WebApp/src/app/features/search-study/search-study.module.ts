import { NgModule } from '@angular/core';
import { SearchStudyModuleConstants } from './search-study-module.constants';

@NgModule({
  imports: [SearchStudyModuleConstants.MODULE_IMPORTS],
  declarations: SearchStudyModuleConstants.MODULE_COMPONENTS,
  providers: [SearchStudyModuleConstants.MODULE_PROVIDERS],
  exports: SearchStudyModuleConstants.MODULE_COMPONENTS,
  entryComponents: SearchStudyModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class SearchStudyModule {}
