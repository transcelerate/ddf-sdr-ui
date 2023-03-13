import { SharedModuleConstants } from './share-module.constants';
import { NgModule } from '@angular/core';
import { CustomTooltipComponent } from './components/custom-tooltip/custom-tooltip.component';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';
import { VersionComparisonComponent } from './components/version-comparison/version-comparison.component';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';
import { SimpleSearchComponent } from './components/simple-search/simple-search/simple-search.component';

@NgModule({
  imports: [SharedModuleConstants.MODULE_IMPORTS],
  declarations: [
    SharedModuleConstants.MODULE_COMPONENTS,
    CustomTooltipComponent,
    AuditTrailComponent,
    VersionComparisonComponent,
    ModalComponentComponent,
    SimpleSearchComponent,
  ],
  providers: [SharedModuleConstants.MODULE_PROVIDERS],
  entryComponents: [SharedModuleConstants.ENTRY_COMPONENTS],
  exports: [SharedModuleConstants.MODULE_EXPORTS],
})
export class SharedModule {}
