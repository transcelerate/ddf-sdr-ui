import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTrailComponent } from 'src/app/shared/components/audit-trail/audit-trail.component';
import { StudyElementDescriptionComponent } from 'src/app/shared/components/study-element-description/study-element-description.component';
import { VersionComparisonComponent } from 'src/app/shared/components/version-comparison/version-comparison.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddUserComponent } from './add-user/add-user.component';

import { GroupManagementComponent } from './group-management/group-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { SoaComponent } from '../soa/soa.component';

const adminModuleRoutes: Routes = [
  {
    path: '',
    component: GroupManagementComponent,
  },
  {
    path: 'addGroup',
    component: AddGroupComponent,
    data: {
      breadcrumb: 'Group',
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
  {
    path: 'userMap',
    component: UserManagementComponent,
  },
  {
    path: 'userMap/addUser',
    component: AddUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminModuleRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
