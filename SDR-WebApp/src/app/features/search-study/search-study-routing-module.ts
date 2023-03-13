import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { AuditTrailComponent } from 'src/app/shared/components/audit-trail/audit-trail.component';
import { VersionComparisonComponent } from 'src/app/shared/components/version-comparison/version-comparison.component';
import { SoaComponent } from 'src/app/features/soa/soa.component';
const searchStudyModuleRoutes: Routes = [
  {
    path: '',
    component: SearchFormComponent,
    data: {
      breadcrumb: 'Search',
    },
    children: [
      {
        path: 'details',
        component: StudyElementDescriptionComponent,
        data: {
          breadcrumb: 'Study Details',
        },
        children: [
          {
            path: 'audit',
            component: AuditTrailComponent,
            data: {
              breadcrumb: 'Revision History',
            },
            children: [
              {
                path: 'compare',
                component: VersionComparisonComponent,
                data: {
                  breadcrumb: 'Study Version Comparison',
                },
              },
            ],
          },
          {
            path: 'soa',
            component: SoaComponent,
            data: {
              breadcrumb: 'SoA Matrix',
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchStudyModuleRoutes)],
  exports: [RouterModule],
})
export class SearchStudyRoutingModule {}
