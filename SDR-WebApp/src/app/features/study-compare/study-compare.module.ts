import { NgModule } from '@angular/core';
import { StudyCompareModuleConstants } from './study-compare-module.constants';

@NgModule({
  imports: [StudyCompareModuleConstants.MODULE_IMPORTS],
  declarations: StudyCompareModuleConstants.MODULE_COMPONENTS,
  providers: [StudyCompareModuleConstants.MODULE_PROVIDERS],
  exports: StudyCompareModuleConstants.MODULE_COMPONENTS,
  entryComponents: StudyCompareModuleConstants.MODULE_ENTRY_COMPONENTS,
})
export class StudyCompareModule {}
