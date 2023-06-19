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

import {
  CellClassParams,
  ColDef,
  GridOptions,
  RowSpanParams,
} from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ServiceCall } from 'src/app/shared/services/service-call/service-call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ModalComponentComponent } from '../../modal-component/modal-component.component';
@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss'],
})
export class SimpleSearchComponent implements OnInit {
  state$: Observable<object>;
  public gridOptions: GridOptions;
  permissionList: string[];

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

  public columnDefs: any;
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
  public isRowSelectable: any;
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
  selectedValue: any;
  from: string | null;
  bsModalRef?: BsModalRef;
  constructor(
    public _formBuilder: FormBuilder,
    private ds: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    public serviceCall: ServiceCall,
    private commonMethod: CommonMethodsService,
    public router: Router,
    public route: ActivatedRoute,
    public activatedRoute: ActivatedRoute
  ) {
    this.gridOptions = <GridOptions>{
      enableSorting: true,
    };
    this.gridOptions.columnDefs = [
      {
        headerName: 'Select',
        cellRendererFramework: CheckboxRenderer,
        width: 40,
        sortable: false,
      },
      {
        headerName: 'Study Title',
        field: 'study.studyTitle',
        tooltipField: 'study.studyTitle',
        headerTooltip: configList.STUDY_TITLE,
        cellRenderer: this.getStudyVersionGrid.bind(this),
      },
      {
        headerName: 'Sponsor ID',
        cellRenderer: this.commonMethod.getSponsorIdGrid.bind(this, 'sponsor'),
        headerTooltip: configList.SPONSOR_ID,
      },
      {
        headerName: 'SDR Upload Version',
        field: 'auditTrail.SDRUploadVersion',
        tooltipField: 'auditTrail.SDRUploadVersion',
        headerTooltip: configList.SDR_UPLOAD_VERSION,
      },
      {
        headerName: 'USDM Version',
        field: 'auditTrail.usdmVersion',
        tooltipField: 'auditTrail.usdmVersion',
        headerTooltip: configList.USDM_VERSION,
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
    (this.icons = {
      sortAscending:
        '<img src="../../../../assets/Images/alpine-icons/asc.svg" class="imgStyle">',
      sortDescending:
        '<img src="../../../../assets/Images/alpine-icons/desc.svg" class="imgStyle">',
    }),
      (this.rowBuffer = 0);

    this.rowSelection = 'single';
    this.rowModelType = 'infinite';
    this.cacheBlockSize = this.BLOCK_SIZE;
    this.cacheOverflowSize = 1;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 1000;
    this.radioButton = true;
    this.gridOptions.context = {
      componentParent: this,
    };
    this.editorForm = this._formBuilder.group(
      {
        studyTitle: [''],
        fromDate: [''],
        toDate: [''],
        sponsorId: [''],
      },
      { validators: this.atLeastOneValidator }
    );
  }

  ngOnInit(): void {
    this.ds.changeDialogState('Search Study Definitions');
    const selectedValue = history.state.from;
    if (selectedValue) {
      this.from = selectedValue;
    }
  }
  /**
   * Construct multiple values for sponsor id and interventional model
   * @param params   ag grid value of that particular row for which link is clicked.
   * @param type  Denotes for which value is the link clicked either for sponsor id or interventional model.
   */

  clear() {
    this.editorForm.setValue({
      //nosonar
      studyTitle: '', //nosonar     //nosonar
      fromDate: '', //nosonar
      toDate: '',
      sponsorId: '', //nosonar
    }); //nosonar
    this.showGrid = false;
  }

  submit() {
    this.router.navigate(['/comparison'], {
      state: { data: this.selectedValue, from: this.from },
    });
  }

  /**
   * Modal for multiple sponsor id and interventional model
   * @param val   ag grid value of that particular row for which link is clicked.
   * @param type  Denotes for which value is the link clicked either for sponsor id or interventional model.
   */
  openModal(val: any, type: any) {
    const initialState: ModalOptions = {
      initialState: {
        list: val,
        title: 'Sponsor Id List',
      },
    };
    this.bsModalRef = this.modalService.show(
      ModalComponentComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
  /**
   * Construct Study Version Grid
   * @param params   ag grid value for each row with data.
   * @returns Return Html Link tag.
   */
  getStudyVersionGrid(params: any) {
    if (!params.data) {
      return '';
    } else {
      const eDiv = document.createElement('span');
      // tslint:disable-next-line:no-this-assignment
      const self = this;
      eDiv.innerHTML =
        '<span class="linkSpan">' + params.data?.study.studyTitle + '</span>';
      eDiv.addEventListener('click', () => {
        self.setSelectedValue(params.data);
      });
      return eDiv;
    }
  }

  setSelectedValue(val: any) {
    localStorage.setItem(
      val.study.studyId + '_' + val.auditTrail.SDRUploadVersion + '_links',
      JSON.stringify(val.links)
    );
    this.router.navigate(
      [
        'details',
        {
          studyId: val.study.studyId,
          versionId: val.auditTrail.SDRUploadVersion,
          usdmVersion: val.auditTrail.usdmVersion,
        },
      ],
      { relativeTo: this.route }
    );
  }
  /* istanbul ignore next */
  // @SONAR_STOP@
  onGridReady(params: any) {
    this.showGrid = false;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    const reqObj = this.editorForm.value;
    var defaultSortModel = [
      {
        colId: 'study.studyTitle',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
    reqObj.sortOrder = 'desc';
    reqObj.sortBy = 'studyTitle';
    reqObj.groupByStudyId = 0;
    if (this.editorForm.valid) {
      this.commonMethod.gridDataSourceForSearchLightStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
      this.showGrid = true;
    }
  }
  /* istanbul ignore end */
  // @SONAR_START@
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
  submitSearch() {
    if (this.editorForm?.value?.fromDate && this.editorForm?.value?.toDate) {
      const fromDate = new Date(this.editorForm.value.fromDate);
      const toDate = new Date(this.editorForm.value.toDate);

      if (fromDate && toDate && fromDate > toDate) {
        alert('To Date must be greater than From Date');
        return;
      }
    }
    if (this.showGrid && this.editorForm.valid) {
      const reqObj = this.editorForm.value;
      reqObj.groupByStudyId = 0;
      this.commonMethod.gridDataSourceForSearchLightStudy(
        reqObj,
        this.gridApi,
        this.BLOCK_SIZE,
        this
      );
    }
    this.showGrid = true;
  }

  getSelectSearch(params: any) {
    if (params.data.selected) {
      this.selectedValue = params.data;
    }
  }

  /**
   *  Logic to restrict special char on typing
   *  @param event Keyboard event on typing.
   */
  restrictChar(event: {
    charCode: number;
    which: number;
    preventDefault: () => void;
  }) {
    var k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      k == 46 ||
      (k >= 48 && k <= 57)
    );
  }
}
