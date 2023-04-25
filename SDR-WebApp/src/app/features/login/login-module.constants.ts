import { LoginRoutingModule } from './login-routing-module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LoginComponent } from './components/login/login.component';
export class LoginModuleConstants {
  static MODULE_COMPONENTS = [LoginComponent];
  static MODULE_IMPORTS = [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    ClipboardModule,
  ];
  static MODULE_PROVIDERS = [];
  static MODULE_ENTRY_COMPONENTS = [];
}
