import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsageComponent } from './usage/usage.component';

const ReportsModuleRoutes: Routes = [
  {
    path: '',
    component: UsageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ReportsModuleRoutes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
