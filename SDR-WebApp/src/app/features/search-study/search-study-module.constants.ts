import { SharedModule } from '../../shared/shared.module';
import { SearchStudyRoutingModule } from './search-study-routing-module';
import { AgGridModule } from 'ag-grid-angular';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
export class SearchStudyModuleConstants {
  static MODULE_COMPONENTS = [SearchFormComponent];
  static MODULE_IMPORTS = [
    SharedModule,
    AgGridModule.withComponents([]),
    SearchStudyRoutingModule,
    MatAutocompleteModule,
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
