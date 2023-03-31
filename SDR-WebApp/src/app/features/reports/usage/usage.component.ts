import { Component, OnInit, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/shared/services/communication.service';
import { CheckboxRenderer } from 'src/app/features/admin/add-group/checkbox-renderer.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
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
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ExportReport } from './usage.interface';
import * as moment from 'moment';
import { ModalComponentComponent } from 'src/app/shared/components/modal-component/modal-component.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent implements OnInit {
  state$: Observable<object>;

  permissionList: string[];
  dropDownConfig = configList;
  filterFieldList: any;
  isSearchSelected: any = undefined;
  filterFieldValueList: any;
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
  exportTooltip = configList.EXPORT_TOOLTIP;
  exportMessage = configList.EXPORT_MESSAGE;
  showGrid: boolean;
  icons: { sortAscending: string; sortDescending: string };
  editorForm: FormGroup;
  initialForm: FormGroup;
  showError: boolean;
  groupError: boolean;
  saveSuccess: boolean;
  isEdit: boolean;
  exportUsageData: ExportReport[] = [];
  disableExportIcon: boolean = false;
  bsModalRef?: BsModalRef;
  noRowsToShowBoolean: boolean = false;
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
    this.columnDefs = [
      {
        headerName: 'Operation',
        field: 'operation',
        tooltipField: 'operation',
        sortable: true,
        width: 100,
      },

      {
        headerName: 'API',
        field: 'api',
        width: 390,
        tooltipField: 'api',
        sortable: true,
      },
      {
        headerName: 'Sender ID',
        field: 'emailId',
        tooltipField: 'emailId',
        sortable: false,
      },
      {
        headerName: 'Request Date',
        field: 'requestDate',
        tooltipField: 'requestDate',
        sortable: true,
      },
      {
        headerName: 'Caller IP Address',
        field: 'callerIpAddress',
        tooltipField: 'callerIpAddress',
        sortable: true,
      },
      {
        headerName: 'Response Code',
        field: 'responseCodeDescription',
        tooltipField: 'responseCodeDescription',
        sortable: true,
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
        // days: [''],
        operation: [''],
        responseCode: [''],
        fromDateTime: ['', Validators.required],
        toDateTime: ['', Validators.required],
      },
      { validators: this.atLeastOneValidator }
    );
    // disable export icon if search results are empty
    this.commonMethod.sendErrorBoolean.subscribe((result: any) => {
      this.noRowsToShowBoolean = result;
    });
  }

  ngOnInit(): void {
    this.ds.changeDialogState('Reports');
    this.editorForm.patchValue({
      fromDateTime: moment()
        .utc(true)
        .startOf('day')
        .toISOString()
        .slice(0, 16),
      responseCode: 0,
      toDateTime: moment().utc(true).toISOString().slice(0, 16),
    });
    //this.submitSearch();
  }

  disableExport() {
    this.disableExportIcon = true;
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
  submitSearch(isFromClear?: boolean) {
    this.showError = false;
    this.disableExportIcon = false;
    const reqObj = this.editorForm.value;
    if (isFromClear) {
      // reqObj.sortOrder = 'desc';
      // reqObj.sortBy = 'requestdate';
      this.gridApi?.setSortModel([
        {
          colId: 'requestDate',
          sort: 'desc', // 'asc'
        },
      ]);
    }
    if (reqObj.fromDateTime && reqObj.toDateTime) {
      if (
        this.checkValidationsOfDates(reqObj.fromDateTime, reqObj.toDateTime)
      ) {
        reqObj.filterByTime = true;
        reqObj.fromDateTime = moment(reqObj.fromDateTime).toISOString();
        reqObj.toDateTime = moment(reqObj.toDateTime).toISOString();
      } else {
        this.disableExportIcon = true;
        return;
      }
    } else {
      reqObj.filterByTime = false;
    }

    this.commonMethod.gridDataSourceForUsageReport(
      reqObj,
      this.gridApi,
      this.BLOCK_SIZE,
      this,
      isFromClear
    );
  }

  checkValidationsOfDates(fromDate: any, toDate: any): boolean {
    let checkBool;
    var currentDate = moment(new Date()).utc(true).toISOString().slice(0, 16);
    if (fromDate && toDate && fromDate >= toDate) {
      alert(configList.FROM_DATE_MORE_THAN_TO_DATE);
      checkBool = false;
    } else if (fromDate > currentDate) {
      alert(configList.VALID_FROM_DATE);
      checkBool = false;
    } else if (toDate > currentDate) {
      alert(configList.VALID_TO_DATE);
      checkBool = false;
    } else {
      var duration = moment(toDate).diff(moment(fromDate));
      let dur = 0,
        dur1 = 0,
        dur2 = 0,
        dur3 = 0,
        dur4 = 0;
      if (moment.duration(duration).years() > 0) {
        dur = moment.duration(duration).years() * 12 * 30 * 24 * 60;
      }
      if (moment.duration(duration).months() > 0) {
        dur1 = moment.duration(duration).months() * 30 * 24 * 60;
      }
      if (moment.duration(duration).days() > 0) {
        dur2 = moment.duration(duration).days() * 24 * 60;
      }
      if (moment.duration(duration).hours() > 0) {
        dur3 = moment.duration(duration).hours() * 60;
      }
      if (moment.duration(duration).minutes() > 0) {
        dur4 = moment.duration(duration).minutes();
      }
      if (dur + dur1 + dur2 + dur3 + dur4 > 43200) {
        alert(configList.EXCEED_DATE_INFO);
        checkBool = false;
      } else {
        console.log('Both the dates are correct');
        checkBool = true;
      }
    }
    return checkBool;
  }

  clear() {
    this.editorForm.patchValue({
      // days: 7,
      fromDateTime: moment()
        .utc(true)
        .startOf('day')
        .toISOString()
        .slice(0, 16),
      responseCode: 0,
      operation: '',
      toDateTime: moment().utc(true).toISOString().slice(0, 16),
    });
    this.submitSearch(true);
  }
  /* istanbul ignore next */
  // @SONAR_STOP@
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
    if (reqObj.fromDateTime && reqObj.toDateTime) {
      if (
        this.checkValidationsOfDates(reqObj.fromDateTime, reqObj.toDateTime)
      ) {
        reqObj.filterByTime = true;
        reqObj.fromDateTime = moment(reqObj.fromDateTime).toISOString();
        reqObj.toDateTime = moment(reqObj.toDateTime).toISOString();
      } else {
        return;
      }
    } else {
      reqObj.filterByTime = false;
    }
    this.commonMethod.gridDataSourceForUsageReport(
      reqObj,
      this.gridApi,
      this.BLOCK_SIZE,
      this
    );
  }
  /* istanbul ignore end */
  // @SONAR_START@

  getUsageData() {
    this.spinner.show();
    const reqObj = this.editorForm.value;
    reqObj.pageSize = configList.EXPORT_REPORT_LIMIT;
    reqObj.sortOrder = 'desc';
    reqObj.sortBy = 'requestdate';
    reqObj.recordNumber = 0;
    this.serviceCall.getUsageReport(reqObj).subscribe({
      next: (data: any) => {
        const usageData = data;
        this.exportUsageData = usageData.map((value: ExportReport) => ({
          operation: value.operation,
          api: value.api,
          emailId: value.emailId,
          requestDate: moment(value.requestDate)
            .utc(true)
            .toISOString()
            .slice(0, 16),
          callerIpAddress: value.callerIpAddress,
          responseCodeDescription: value.responseCodeDescription,
        }));
        this.openPopUp();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openPopUp() {
    this.spinner.hide();
    const initialState: ModalOptions = {
      initialState: {
        title: 'Information',
        list: [configList.EXPORT_POPUP_INFO],
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalComponentComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Ok';
    this.bsModalRef.content.passEntry.subscribe((result: any) => {
      console.log(result);
      this.downloadCSV();
    });
  }

  downloadCSV() {
    var options = {
      title: 'Usage Report',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle: false,
      useBom: false,
      headers: [
        'Operation',
        'API',
        'Sender ID',
        'Request Date',
        'Caller IP Address',
        'Response Code',
      ],
    };
    const entryDateTime = moment(new Date()).format('YYYYMMDD');
    new ngxCsv(
      this.exportUsageData,
      'System_Usage_Report_' + environment.envName + '_' + entryDateTime,
      options
    );
    this.spinner.hide();
  }

  getToday(): string {
    return new Date().toISOString().slice(0, 16);
  }
}
