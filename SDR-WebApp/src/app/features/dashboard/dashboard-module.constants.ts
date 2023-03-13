import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { AgGridModule } from 'ag-grid-angular';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';

export class DashboardModuleConstants {
  static MODULE_COMPONENTS = [RecentActivityComponent];
  static MODULE_IMPORTS = [
    SharedModule,
    AgGridModule.withComponents([]),
    DashboardRoutingModule,
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
