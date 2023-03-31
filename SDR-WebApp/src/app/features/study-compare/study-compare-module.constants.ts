import { SharedModule } from '../../shared/shared.module';

import { AgGridModule } from 'ag-grid-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StudyCompareComponent } from './components/study-compare.component';
import { StudyCompareRoutingModule } from './study-compare-routing-module';
export class StudyCompareModuleConstants {
  static MODULE_COMPONENTS = [StudyCompareComponent];
  static MODULE_IMPORTS = [
    SharedModule,
    AgGridModule.withComponents([]),
    StudyCompareRoutingModule,
    MatAutocompleteModule,
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
