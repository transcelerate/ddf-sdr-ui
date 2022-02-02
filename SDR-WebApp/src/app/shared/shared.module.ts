
import { SharedModuleConstants } from './share-module.constants';
import { NgModule } from '@angular/core';
import { CustomTooltipComponent } from './components/custom-tooltip/custom-tooltip.component';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';
import { VersionComparisonComponent } from './components/version-comparison/version-comparison.component';

@NgModule({
    imports: [SharedModuleConstants.MODULE_IMPORTS],
    declarations: [SharedModuleConstants.MODULE_COMPONENTS, CustomTooltipComponent, AuditTrailComponent, VersionComparisonComponent],
    providers: [SharedModuleConstants.MODULE_PROVIDERS],
    entryComponents: [SharedModuleConstants.ENTRY_COMPONENTS],
    exports: [SharedModuleConstants.MODULE_EXPORTS]
})

export class SharedModule { }
