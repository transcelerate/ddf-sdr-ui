import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
import { BtnCellRenderer } from './button-renderer/button-renderer.component';
import { TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogService } from 'src/app/shared/services/communication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { async } from 'rxjs';
@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss'],
})
export class GroupManagementComponent implements OnInit {
  // private content: TemplateRef<any>;
  // private confirmation: TemplateRef<any>;
  @ViewChild('content') content: TemplateRef<ElementRef>;
  @ViewChild('confirmation') confirmation: TemplateRef<ElementRef>;
  public gridOptions: GridOptions;
  columnDefs: ColDef[];
  public groupList = [
    {
      groupId: 'd47a4fdb-944c-4a0d-add2-2f78706f0e52',
      groupName: 'AlzheimerRead',
      groupDescription: 'Detailed description of group',
      permission: 'READONLY',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'SEQUENTIAL'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: '',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: '',
      groupEnabled: true,
    },
    {
      groupId: 'b9f848b8-9af7-46c1-9a3c-2663f547cc7a',
      groupName: 'AlzheimerReadWrite',
      groupDescription: 'Detailed description of group',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'SEQUENTIAL'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: [
            'StudyTitle1-Tag4',
            'StudyTitle1-Tag5',
            'StudyTitle1-Tag6',
            'StudyTitle1-Tag7',
            'StudyTitle1-Tag8',
            'StudyTitle1-Tag9',
            'StudyTitle1-Tag1',
            'StudyTitle1-Tag2',
          ],
        },
      ],
      groupModifiedOn: '2022-MAY-11',
      groupModifiedBy: '',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: 'admin1@SDR.com',
      groupEnabled: true,
    },
    {
      groupId: 'd7aa036b-8ebf-4960-936b-e02adf5b6270',
      groupName: 'AmnesiaRead',
      groupDescription: 'Group is for Amnesia',
      permission: 'READONLY',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['StudyTitle1-Tag6', 'StudyTitle1-Tag7'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: null,
      groupCreatedOn: '2022-MAY-11',
      groupCreatedBy: '',
      groupEnabled: true,
    },
    {
      groupId: 'c50ccb41-db9b-4b97-b132-cbbfaa68af5a',
      groupName: 'AmnesiaReadWrite',
      groupDescription: 'Group is for Amnesia',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['StudyTitle1-Tag6', 'StudyTitle1-Tag7'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: null,
      groupCreatedOn: '2022-MAY-11',
      groupCreatedBy: '',
      groupEnabled: true,
    },
    {
      groupId: '0193a357-8519-4488-90e4-522f701658b9',
      groupName: 'OncologyRead',
      groupDescription: 'Detailed description of group',
      permission: 'READONLY',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'EXPANDED_ACCESS'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['Study Number Two', 'StudyTitle1-Tag3'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: 'admin2@SDR.com',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: 'admin1@SDR.com',
      groupEnabled: true,
    },
    {
      groupId: '83864612-ffbd-463f-90ce-3e8819c5d132',
      groupName: 'OncologyWrite',
      groupDescription: 'Detailed description of group',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'EXPANDED_ACCESS'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['StudyTitle1-Tag2', 'StudyTitle1-Tag3'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: 'admin2@SDR.com',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: 'admin1@SDR.com',
      groupEnabled: true,
    },
    {
      groupId: '9eb070f2-58e9-4c63-ae29-43d4f3202809',
      groupName: 'ParkinsonReadWrite',
      groupDescription: 'Detailed description of group',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'SEQUENTIAL'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['StudyTitle1-Tag4', 'StudyTitle1-Tag5'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: 'admin2@SDR.com',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: '',
      groupEnabled: true,
    },
    {
      groupId: '236b775e-6ef1-4a69-b398-74fbe8413771',
      groupName: 'TherapyRead',
      groupDescription: 'Group is for Therapy',
      permission: 'READ_WRITE',
      groupFilter: [
        {
          groupFieldName: 'studyType',
          groupFilterValues: ['INTERVENTIONAL', 'SEQUENTIAL'],
        },
        {
          groupFieldName: 'study',
          groupFilterValues: ['StudyTitle1-Tag4', 'StudyTitle1-Tag5'],
        },
      ],
      groupModifiedOn: '2022-MAY-10',
      groupModifiedBy: '',
      groupCreatedOn: '2022-MAY-10',
      groupCreatedBy: '',
      groupEnabled: true,
    },
  ];
  rowData: any;
  frameworkComponents: { btnCellRenderer: typeof BtnCellRenderer };
  showError: boolean = false;
  modalRef?: BsModalRef;
  filterFieldList: any;
  suppressRowTransform = true;
  selectedGroup: any;
  isGroupSingleValue: boolean;
  gridApi: any;
  gridColumnApi: any;
  rowBuffer: number;
  rowSelection: string;
  rowModelType: string;
  cacheBlockSize: number;
  cacheOverflowSize: number;
  maxConcurrentDatasourceRequests: number;
  infiniteInitialRowCount: number;
  maxBlocksInCache: number;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  defaultColDef: ColDef;
  deleteGroup: any;
  responseData: any;
  constructor(
    private modalService: BsModalService,
    private ds: DialogService,
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall,
    private commonMethod: CommonMethodsService
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.cacheBlockSize = 1000;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 1000;
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
  }

  ngOnInit(): void {
    let self = this;
    this.ds.changeDialogState('Group Management');
    this.gridOptions.columnDefs = [
      {
        headerName: 'Group Name',
        field: 'groupName',
        width: 214,
        cellClass: function (params) {
          return self.mergeCell(params);
        },
      },
      {
        headerName: 'Group Filter Field',
        field: 'groupFieldName',
        width: 212,
      },
      {
        headerName: 'Rule / Selected Value(s)',
        field: 'groupFilterValues',
        width: 550,
        cellRenderer: 'btnCellRenderer',
      },
      {
        headerName: 'Permission',
        field: 'permission',
        width: 150,
        cellClass: function (params) {
          return self.mergeCell(params);
        },
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

    this.gridOptions.context = {
      componentParent: this,
    };

    this.getAllGroups();
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }
  getAllGroups() {
    let reqObj = {
      pageSize: 1000,
      pageNumber: 1,
      
    };
    this.spinner.hide();
    this.serviceCall.getAllGroups(reqObj).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.responseData = data;
        if (data.length > 0) {
          // data = data.map((elem: { clinicalStudy: any }) => {
          //   return elem;
          // });

          let rows: any[] = [];
          data.forEach(
            (element: {
              groupFilter: any[];
              groupName: any;
              permission: any;
              groupId: any;
            }) => {
              element.groupFilter.forEach((fieldValues, index) => {
                if (index === 0) {
                  Object.assign(fieldValues, { groupName: element.groupName });
                  Object.assign(fieldValues, {
                    permission: element.permission,
                  });
                }
                Object.assign(fieldValues, { groupId: element.groupId });
                rows.push(fieldValues);
              });
            }
          );
          this.rowData = rows;
          this.gridOptions.rowData = rows;
        }
      },
      error: (error) => {
        this.rowData = [];
        if (error && error.error && error.error.statusCode == '404') {
          this.gridApi.showNoRowsOverlay();
        } else {
          this.showError = true;
          // Array.from(
          //   document.getElementsByClassName(
          //     'ag-cell'
          //   ) as HTMLCollectionOf<HTMLElement>
          // ).forEach((element) => {
          //   element.style.border = 'none';
          // });
        }
      },
    });
  }
  mergeCell(params: CellClassParams) {
    if (this.rowData && params.data) {
      let data = this.rowData.filter(
        (x: any, index: any) => x.groupId == params.data.groupId
      );
      let index = data.findIndex(
        (x: { groupFieldName: any }) =>
          x.groupFieldName === params.data.groupFieldName
      );
      if (data.length > 1) {
        if (index == 0) {
          return 'border-bottom-none';
        } else if (index == data.length - 1) {
          return 'border-top-none';
        } else {
          return 'border-none';
        }
      }
      return 'none';
    } else {
      return 'none';
    }
  }
  onEditButtonClick(params: any) {
    console.log(params);
  }
  openModal(field: any) {
    this.modalRef = this.modalService.show(this.content, { class: 'modal-lg' });
    this.filterFieldList = field;
  }
  openDeleteConfirmation(field: any) {
    this.showError = false;
    let data = this.rowData.filter(
      (x: any, index: any) => x.groupId == field.groupId
    );
    this.modalRef = this.modalService.show(this.confirmation);
    this.isGroupSingleValue = data.length == 1;
    this.selectedGroup = data[0].groupName;
    this.deleteGroup = field;
  }

  /* istanbul ignore next */
  // @SONAR_STOP@
  /**
   *  This method is triggered on ag grid initialization.
   *  @param params ag grid value for each row with data.
   */
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();

    //this.gridApi.addEventListener('failCallback', this.onServerFailCallback);
  }

  /* istanbul ignore end */
  // @SONAR_START@

  confirm() {
    this.modalRef?.hide();
    let data = this.responseData.filter(
      (x: any, index: any) => x.groupId == this.deleteGroup.groupId
    );
    if(!this.isGroupSingleValue){
      data[0].groupFilter = data[0].groupFilter.filter(
        (elem: { groupFieldName: any }) => {
          return elem.groupFieldName !== this.deleteGroup.groupFieldName;
        }
      );
    }
    
    data[0].groupEnabled = !this.isGroupSingleValue;
    let response = this.commonMethod.postGroup(data[0], this);
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
