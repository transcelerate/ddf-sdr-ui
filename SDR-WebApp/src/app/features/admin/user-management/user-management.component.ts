import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'src/app/shared/services/communication.service';
import { BtnCellRenderer } from '../group-management/button-renderer/button-renderer.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss','../group-management/group-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<ElementRef>;
  @ViewChild('confirmation') confirmation: TemplateRef<ElementRef>;
  public gridOptions: GridOptions;
  columnDefs: ColDef[];
  frameworkComponents: { btnCellRenderer: typeof BtnCellRenderer; };
  userList: { oid: string; email: string; groups: { groupId: string; groupName: string; isActive: boolean; }[]; }[];
  rowData: any[];
  modalRef?: BsModalRef;
  userGroupList: any;
  selectedUser: any;
  constructor(private ds: DialogService,private modalService: BsModalService,) { 
    this.gridOptions = <GridOptions>{
      enableSorting: true,
    };
    
  }

  ngOnInit(): void {
    this.ds.changeDialogState('User Management');
    this.userList = [
      {
          "oid": "<AzurePortal-OID1>",
          "email": "user1@SDR.com",
          "groups": [
              {
                  "groupId": "0193a357-8519-4488-90e4-522f701658b9",
                  "groupName": "OncologyRead",
                  "isActive": true
              },
              {
                  "groupId": "b9f848b8-9af7-46c1-9a3c-2663f547cc7a",
                  "groupName": "AlzheimerReadWrite",
                  "isActive": true
              },
              {
                  "groupId": "9eb070f2-58e9-4c63-ae29-43d4f3202809",
                  "groupName": "ParkinsonReadWrite",
                  "isActive": true
              },
              {
                  "groupId": "d47a4fdb-944c-4a0d-add2-2f78706f0e52",
                  "groupName": "AlzheimerRead",
                  "isActive": true
              },
              {
                "groupId": "0193a357-8519-4488-90e4-522f701658b9",
                "groupName": "OncologyRead",
                "isActive": true
            },
            {
                "groupId": "b9f848b8-9af7-46c1-9a3c-2663f547cc7a",
                "groupName": "AlzheimerReadWrite",
                "isActive": true
            },
            {
                "groupId": "9eb070f2-58e9-4c63-ae29-43d4f3202809",
                "groupName": "ParkinsonReadWrite",
                "isActive": true
            },
            {
                "groupId": "d47a4fdb-944c-4a0d-add2-2f78706f0e52",
                "groupName": "AlzheimerRead",
                "isActive": true
            }
          ]
      },
      {
          "oid": "<AzurePortal-OID2>",
          "email": "user2@SDR.com",
          "groups": [
              {
                  "groupId": "0193a357-8519-4488-90e4-522f701658b9",
                  "groupName": "OncologyRead",
                  "isActive": true
              }
          ]
      },
      {
          "oid": "<AzurePortal-OID3>",
          "email": "user3@SDR.com",
          "groups": [
              {
                  "groupId": "83864612-ffbd-463f-90ce-3e8819c5d132",
                  "groupName": "OncologyWrite",
                  "isActive": true
              },
              {
                  "groupId": "d47a4fdb-944c-4a0d-add2-2f78706f0e52",
                  "groupName": "AlzheimerRead",
                  "isActive": true
              }
          ]
      },
      {
          "oid": "<AzurePortal-OID4>",
          "email": "user4@SDR.com",
          "groups": [
              {
                  "groupId": "83864612-ffbd-463f-90ce-3e8819c5d132",
                  "groupName": "OncologyWrite",
                  "isActive": true
              }
          ]
      },
      {
          "oid": "<AzurePortal-OID3>",
          "email": "user5@SDR.com",
          "groups": [
              {
                  "groupId": "236b775e-6ef1-4a69-b398-74fbe8413771",
                  "groupName": "TherapyRead",
                  "isActive": true
              }
          ]
      }
  ];
    this.gridOptions.columnDefs = [
      {
        headerName: 'User',
        field: 'email',
        width: 214,
      },
      
      {
        headerName: 'Groups',
        field: 'groups',
        width: 799,
        cellRenderer: 'btnCellRenderer',
      },
      {
        headerName: 'Action',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          type: 'action',
        },
        width: 103,
      },
    ];

    let rows: any[] = [];
    this.userList.forEach((element) => {
      element.groups.forEach((fieldValues, index) => {
        
        Object.assign(fieldValues, { userName: element.email});
        rows.push(fieldValues);
      });
    });
    console.log(rows);
    this.rowData = this.userList;
    this.gridOptions.rowData = this.rowData;
    this.gridOptions.context = {
      componentParent: this,
    };
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }
  openModal(field: any) {
    debugger;
    this.modalRef = this.modalService.show(this.content,{class: 'modal-lg'});
    this.userGroupList = field;
  }
  confirm(): void {
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }

  openDeleteConfirmation(field: any) {
    debugger;
    let data = this.rowData.filter(
      (x: any, index: any) => x.groups.groupId == field.groups.groupId
    );
    this.modalRef = this.modalService.show(this.confirmation);
    this.selectedUser = data[0].email;
  }
  

}
