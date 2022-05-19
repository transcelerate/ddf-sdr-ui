import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddUserComponent } from './add-user/add-user.component';

import { GroupManagementComponent } from './group-management/group-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

const adminModuleRoutes: Routes = [
  {
    path: '',
    component: GroupManagementComponent,
  },
  {
    path: 'addGroup',
    component: AddGroupComponent,
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
