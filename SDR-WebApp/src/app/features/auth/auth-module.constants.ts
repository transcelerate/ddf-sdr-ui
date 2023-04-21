import { AuthRoutingModule } from './auth-routing-module';
import { AuthComponent } from './auth.component';

export class AuthModuleConstants {
  static MODULE_COMPONENTS = [AuthComponent];
  static MODULE_IMPORTS = [AuthRoutingModule];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
