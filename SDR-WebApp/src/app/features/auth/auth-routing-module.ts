import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
const authModuleRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authModuleRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
