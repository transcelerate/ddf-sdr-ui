import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing-module';
import { AgGridModule } from 'ag-grid-angular';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { BtnCellRenderer } from './group-management/button-renderer/button-renderer.component';
import { CheckboxRenderer } from './add-group/checkbox-renderer.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
export class AdminModuleConstants {
  static MODULE_COMPONENTS = [
    GroupManagementComponent,
    BtnCellRenderer,
    AddGroupComponent,
    CheckboxRenderer,
    UserManagementComponent,
    AddUserComponent,
  ];
  static MODULE_IMPORTS = [
    SharedModule,
    AgGridModule.withComponents([CheckboxRenderer]),
    NgMultiSelectDropDownModule,
    AdminRoutingModule,
    AlertModule.forRoot(),
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
