import { SharedModule } from '../../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing-module';
import { AgGridModule } from 'ag-grid-angular';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UsageComponent } from './usage/usage.component';
export class ReportsModuleConstants {
  static MODULE_COMPONENTS = [UsageComponent];
  static MODULE_IMPORTS = [
    SharedModule,
    AgGridModule.withComponents([]),
    ReportsRoutingModule,
    MatAutocompleteModule,
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
