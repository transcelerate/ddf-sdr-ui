import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { BtnCellRenderer } from '../group-management/button-renderer/button-renderer.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.scss',
    '../group-management/group-management.component.scss',
  ],
})
export class UserManagementComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<ElementRef>;
  @ViewChild('confirmation') confirmation: TemplateRef<ElementRef>;
  public gridOptions: GridOptions;
  columnDefs: ColDef[];
  frameworkComponents: { btnCellRenderer: typeof BtnCellRenderer };
  userList: {
    oid: string;
    email: string;
    groups: { groupId: string; groupName: string; isActive: boolean }[];
  }[];

  public gridApi: any;
  public gridColumnApi: any;
  public defaultColDef: any;
  public rowBuffer: any;
  public rowSelection: any;
  public rowModelType: any;
  public cacheBlockSize: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  public maxBlocksInCache: any;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  public rowData: any;
  modalRef?: BsModalRef;
  userGroupList: any;
  selectedUser: any;
  showError: boolean;
  constructor(
    public serviceCall: ServiceCall,
    private ds: DialogService,
    private spinner: NgxSpinnerService,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.gridOptions = <GridOptions>{
      rowSelection: 'multiple',
      rowModelType: 'infinite',
      cacheBlockSize: this.BLOCK_SIZE,
      cacheOverflowSize: 1,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 1,
      maxBlocksInCache: 1000,
      rowData: [],
      rowBuffer: 0,
    };
  }

  ngOnInit(): void {
    this.ds.changeDialogState('Admin');

    this.gridOptions.columnDefs = [
      {
        headerName: 'User',
        field: 'email',
        width: 314,
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

    // this.rowData = this.userList;
    // this.gridOptions.rowData = this.rowData;
    this.gridOptions.context = {
      componentParent: this,
    };
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }
  openModal(field: any) {
    this.modalRef = this.modalService.show(this.content, { class: 'modal-lg' });
    this.userGroupList = field;
  }
  confirm(): void {
    this.modalRef?.hide();
    this.selectedUser.groups = this.selectedUser.groups.map((elem: any) => {
      elem.isActive = false;
      return elem;
    });
    this.commonMethod.postUser(this.selectedUser, this);
  }

  decline(): void {
    this.modalRef?.hide();
  }

  openDeleteConfirmation(field: any) {
    this.showError = false;
    this.modalRef = this.modalService.show(this.confirmation);
    this.selectedUser = field;
  }
  /**
   *  This method is triggered on ag grid initialization.
   *  @param params ag grid value for each row with data.
   */
  onGridReady(params: any) {
    this.gridApi = params.api;
    //this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.gridOptions.rowModelType = 'infinite';
    this.getAllUsers();
  }
  getAllUsers() {
    this.commonMethod.gridDataSourceForUser(
      { pageNumber: '', pageSize: '' },
      this.gridApi,
      this.gridOptions,
      this.BLOCK_SIZE,
      this
    );
  }
  edit(params: any) {
    this.router.navigate(['admin/userMap/addUser'], {
      state: { data: params },
    });
    //this.router.navigateByUrl('admin/addGroup', { state: { data: params } });
  }
}
