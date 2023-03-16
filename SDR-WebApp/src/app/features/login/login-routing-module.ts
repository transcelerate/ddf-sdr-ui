import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const LoginModuleRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(LoginModuleRoutes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
