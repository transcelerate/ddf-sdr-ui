export class Group {
  groupId: string = '';
  groupName: string = '';
  groupDescription: string = '';
  groupFilter: GroupFilter[] = [];
  permission: string = '';
  users: UserList[] = [];
  groupCreatedBy: string = '';
  groupCreatedOn: string = '';
  groupModifiedBy: string = '';
  groupModifiedOn: string = '';
  groupEnabled: boolean = false;
}

export class GroupFilter {
  groupFieldName: string = '';
  groupFilterValues:any [] = [];
}

export class UserList {
  oid: string = '';
  email: string = '';
  isActive: boolean = false;
}
