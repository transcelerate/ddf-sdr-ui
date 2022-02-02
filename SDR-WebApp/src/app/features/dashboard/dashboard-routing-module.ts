import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { AuditTrailComponent } from 'src/app/shared/components/audit-trail/audit-trail.component';
import { VersionComparisonComponent } from 'src/app/shared/components/version-comparison/version-comparison.component';
const dashboardModuleRoutes: Routes = [
  {
    path: '',
    component: RecentActivityComponent,
    data: {
        breadcrumb: 'Home',
        //url:'home'
    },
    children: [
      {
        path: 'details',
        component: StudyElementDescriptionComponent,
        data: {
            breadcrumb: 'Study Details',
            //url:'home/details'
        },
        children: [
          {
            path: 'audit',
            component: AuditTrailComponent,
            data: {
                breadcrumb: 'Audit Trail',
                //url:'home/details/audit'
            },
            children: [
              {
                path: 'compare',
                component: VersionComparisonComponent,
                data: {
                    breadcrumb: 'Study Version Comparison',
                    //url:'home/details/audit/compare'
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
// const dashboardModuleRoutes: Routes = [
//     {
//       path: '',
//       component: RecentActivityComponent,
      
//       data: {
//           breadcrumb: 'Home'
//       },
      
//     },
//     {
//         path: 'details',
//         component: StudyElementDescriptionComponent,
//         data: {
//             breadcrumb: 'Study Details'
//         },
//       },
//   ];
@NgModule({
  imports: [RouterModule.forChild(dashboardModuleRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
