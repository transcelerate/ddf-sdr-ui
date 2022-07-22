import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { CheckboxRenderer } from 'src/app/features/admin/add-group/checkbox-renderer.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent implements OnInit  { state$: Observable<object>;

  permissionList: string[];
  dropDownConfig = configList;
  filterFieldList: any;
  isSearchSelected: any = undefined;
  filterFieldValueList: any;
  modalRef?: BsModalRef;
  content: string = '';
  showContent: boolean;
  showAddButton = false;
  searchList: any = [];
  noRowsTemplate: string;
  public gridApi: any;
  public gridColumnApi: any;
  

  public columnDefs;
  public defaultColDef;
  public rowBuffer: any;
  public rowSelection;
  public rowModelType;
  public cacheBlockSize;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  public maxBlocksInCache;
  public rowData: any;
  public value: any = [];
  public tooltipShowDelay = 0;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  showGrid: boolean;
  icons: { sortAscending: string; sortDescending: string };


  

  editorForm: FormGroup;
  initialForm: FormGroup;
  showError: boolean;
  groupError: boolean;
  saveSuccess: boolean;
  isEdit: boolean;
    radioButton: boolean;
   
  constructor(
    public _formBuilder: FormBuilder,
    private ds: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    
    this.columnDefs  = [
      
      {
        headerName: 'Operation',
        field: 'operation',
        tooltipField:'operation',
        sortable: true,
        width:100
        
      },
  
      {
        headerName: 'API',
        field: 'api',
        width:390,
        tooltipField:'api',
        sortable: true
        
      },
      {
        headerName: 'Sender ID',
        field: 'emailId',
        tooltipField:'emailId',
        sortable: false
        
      },
      {
        headerName: 'Request Date',
        field: 'requestDate',
        tooltipField:'requestDate',
        sortable: true
        
      },
      {
        headerName: 'Caller IP Address',
        field: 'callerIpAddress',
        tooltipField:'callerIpAddress',
        sortable: true
      },
      {
        headerName: 'Response Code',
        field: 'responseCodeDescription',
        tooltipField:'responseCodeDescription',
        sortable: true
      },
    ];
  
    this.defaultColDef = {
      
      resizable: true,
     
    };
    (this.icons = {
      sortAscending:
        '<img src="../../../../assets/Images/alpine-icons/asc.svg" class="imgStyle">',
      sortDescending:
        '<img src="../../../../assets/Images/alpine-icons/desc.svg" class="imgStyle">',
    }),
      (this.rowBuffer = 0);
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.cacheBlockSize = this.BLOCK_SIZE;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 1000;
    
  
    
    this.editorForm = this._formBuilder.group(
      {
        days: [''],
        operation: [''],
        responseCode: [''],
      },
      { validators: this.atLeastOneValidator }
    );
   
  }
  
  ngOnInit(): void {
    this.ds.changeDialogState('Reports');
    this.editorForm.patchValue({
      days:7,
      responseCode:0
    });
    //this.submitSearch();
  }
  
  
  
  
  
  
  

  

  /**
   *  Validation to enable search button
   * @param control Formgroup object
   */
  public atLeastOneValidator: any = (control: FormGroup): any => {
    let controls = control.controls;
    if (controls) {
      let theOne = Object.keys(controls).findIndex(
        (key) => controls[key].value !== ''
      );
      if (theOne === -1) {
        return {
          atLeastOneRequired: {
            text: 'At least one should be selected',
          },
        };
      }
    }
  };
  /**
   *Validate date and fetch search results
   */
  submitSearch(isFromClear?:boolean) {
    const reqObj = this.editorForm.value;
    if(isFromClear){
      // reqObj.sortOrder = 'desc';
      // reqObj.sortBy = 'requestdate';
      this.gridApi.setSortModel([
        {
         colId: 'requestDate',
         sort: 'desc' // 'asc'
        }  
      ])
    }
    
    this.commonMethod.gridDataSourceForUsageReport(
      reqObj,
      this.gridApi,
      this.BLOCK_SIZE,
      this,isFromClear
    );
    
  }
  
 
  
  
 
  clear(){
    this.editorForm.patchValue({
      days:7,
      responseCode:0,
      operation:''
    });
    this.submitSearch(true);
  }
  decline(): void {
    this.modalRef?.hide();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    var defaultSortModel = [
      {
        colId: 'requestDate',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
    const reqObj = this.editorForm.value;
    reqObj.sortOrder = 'desc';
    reqObj.sortBy = 'requestdate';

    this.commonMethod.gridDataSourceForUsageReport(
      reqObj,
      this.gridApi,
      this.BLOCK_SIZE,
      this
    );

    
  }
  }
  
  
