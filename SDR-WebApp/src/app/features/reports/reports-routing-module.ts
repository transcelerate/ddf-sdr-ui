import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsageComponent } from './usage/usage.component';

const ReportsModuleRoutes: Routes = [
  {
    path: '',
    component: UsageComponent,
    // data: {
    //   breadcrumb: 'Search',
    // },
    // children: [
    //   {
    //     path: 'details',
    //     component: StudyElementDescriptionComponent,
    //     data: {
    //       breadcrumb: 'Study Details',
    //     },
    //     children: [
    //       {
    //         path: 'audit',
    //         component: AuditTrailComponent,
    //         data: {
    //           breadcrumb: 'Audit Trail',
    //         },
    //         children: [
    //           {
    //             path: 'compare',
    //             component: VersionComparisonComponent,
    //             data: {
    //               breadcrumb: 'Study Version Comparison',
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ReportsModuleRoutes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
