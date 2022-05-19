import { Component, OnInit } from '@angular/core';
import {IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss','../add-group/add-group.component.scss']
})
export class AddUserComponent implements OnInit {
  groupList: { groupId: string; groupName: string; }[];
  
  groupSelected = [];
  userSelected = [];
    dropdownSettings: IDropdownSettings;
    dropdownSettingsUser: IDropdownSettings;
    userList: { oid: string; email: string; }[];
  constructor() { 

  }

  ngOnInit(): void {
    this.userList = [
        {
            "oid": "0193a357-8519-4488-90e4-522f701658b9",
            "email": "user1@SDR.com"
        },
        {
            "oid": "83864612-ffbd-463f-90ce-3e8819c5d132",
            "email": "user2@SDR.com"
        },
        {
            "oid": "b9f848b8-9af7-46c1-9a3c-2663f547cc7a",
            "email": "user3@SDR.com"
        },
        {
            "oid": "9eb070f2-58e9-4c63-ae29-43d4f3202809",
            "email": "user4@SDR.com"
        },
        {
            "oid": "d47a4fdb-944c-4a0d-add2-2f78706f0e52",
            "email": "user5@SDR.com"
        },
        {
            "oid": "236b775e-6ef1-4a69-b398-74fbe8413771",
            "email": "user6@SDR.com"
        },
        {
            "oid": "d7aa036b-8ebf-4960-936b-e02adf5b6270",
            "email": "user7@SDR.com"
        },
        {
            "oid": "c50ccb41-db9b-4b97-b132-cbbfaa68af5a",
            "email": "user8@SDR.com"
        },
        {
            "oid": "985c4eaf-4823-44f6-844d-35c55872d84f",
            "email": "user9@SDR.com"
        }
    ]
    this.groupList = [
      {
          "groupId": "0193a357-8519-4488-90e4-522f701658b9",
          "groupName": "OncologyRead"
      },
      {
          "groupId": "83864612-ffbd-463f-90ce-3e8819c5d132",
          "groupName": "OncologyWrite"
      },
      {
          "groupId": "b9f848b8-9af7-46c1-9a3c-2663f547cc7a",
          "groupName": "AlzheimerReadWrite"
      },
      {
          "groupId": "9eb070f2-58e9-4c63-ae29-43d4f3202809",
          "groupName": "ParkinsonReadWrite"
      },
      {
          "groupId": "d47a4fdb-944c-4a0d-add2-2f78706f0e52",
          "groupName": "AlzheimerRead"
      },
      {
          "groupId": "236b775e-6ef1-4a69-b398-74fbe8413771",
          "groupName": "TherapyRead"
      },
      {
          "groupId": "d7aa036b-8ebf-4960-936b-e02adf5b6270",
          "groupName": "AmnesiaRead"
      },
      {
          "groupId": "c50ccb41-db9b-4b97-b132-cbbfaa68af5a",
          "groupName": "AmnesiaReadWrite"
      },
      {
          "groupId": "985c4eaf-4823-44f6-844d-35c55872d84f",
          "groupName": "HeadacheRead"
      }
  ]
  this.dropdownSettings = {
    singleSelection: false,
    idField: 'groupId',
    textField: 'groupName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 300000,
    allowSearchFilter: true,
 
  };
  this.dropdownSettingsUser = {
    singleSelection: true,
    idField: 'oid',
    textField: 'email',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 300000,
    allowSearchFilter: true,
 
  };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
