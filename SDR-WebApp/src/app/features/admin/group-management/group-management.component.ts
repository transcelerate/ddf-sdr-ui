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
import { ActivatedRoute, Router } from '@angular/router';
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
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute
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
    };
  }

  ngOnInit(): void {
    let self = this;
    this.ds.changeDialogState('Admin');
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
    this.spinner.show();
    this.serviceCall.getAllGroups(reqObj).subscribe({
      next: (data: any) => {
        this.spinner.hide();
        this.responseData = data;
        if (data.length > 0) {
          // data = data.map((elem: { study: any }) => {
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
        this.spinner.hide();
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
  mergeCell(params: any) {
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
    if (!this.isGroupSingleValue) {
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
  edit(params: any) {
    let selectedGroup = this.responseData.filter(
      (x: any, index: any) => x.groupId == params.groupId
    );
    this.router.navigate(['admin/addGroup'], {
      state: { data: selectedGroup[0], selected: params.groupFieldName },
    });
    //this.router.navigateByUrl('admin/addGroup', { state: { data: params } });
  }
}
