import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { configList } from 'src/app/shared/components/study-element-description/config/study-element-field-config';
import { CommonMethodsService } from 'src/app/shared/services/common-methods.service';
import { DialogService } from 'src/app/shared/services/communication.service';
import { CheckboxRenderer } from 'src/app/features/admin/add-group/checkbox-renderer.component';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponentComponent } from '../../../shared/components/modal-component/modal-component.component';

@Component({
  selector: 'app-study-compare',
  templateUrl: './study-compare.component.html',
  styleUrls: ['./study-compare.component.scss'],
})
export class StudyCompareComponent implements OnInit, OnDestroy {
  searchOne: any;
  searchTwo: any;
  studyOneId: any;
  studyOneVersion: any;
  studyTwoId: any;
  studyTwoVersion: any;
  studyOneTitle: any;
  studyTwoTitle: any;
  studyOneUSDMVer: any;
  studyTwoUSDMVer: any;
  toolTipOne: string;
  toolTipTwo: string;
  showError = false;

  public gridApi: any;
  public gridColumnApi: any;

  public columnDefs: any;
  public defaultColDef: any;
  public rowBuffer: any;
  public rowSelection: any;
  public rowModelType: any;
  public cacheBlockSize: any;
  public cacheOverflowSize: any;
  public maxConcurrentDatasourceRequests: any;
  public infiniteInitialRowCount: any;
  public maxBlocksInCache: any;
  public rowData: any;
  public value: any = [];
  public tooltipShowDelay = 0;
  public isRowSelectable: any;
  public gridOptions: GridOptions;
  selectedValue: any;
  BLOCK_SIZE: number = configList.BLOCK_SIZE;
  showGrid: boolean;
  noRowsTemplate: string;
  icons: { sortAscending: string; sortDescending: string };
  editorForm: FormGroup;
  radioButton: boolean;
  from: any;
  showSearch: boolean = false;
  bsModalRef?: BsModalRef;
  constructor(
    private ds: DialogService,
    public router: Router,
    public route: ActivatedRoute,
    public commonMethod: CommonMethodsService,
    public _formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {
    this.ds.callClearBool.subscribe((state) => {
      if (state) {
        this.clear();
        this.clearSearch();
        this.showSearch = false;
      }
    });

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
    this.setSearchValue();
  }

  setSearchValue(selectedSearch?: any) {
    const selectedValue = selectedSearch;
    if (selectedValue) {
      if (this.from == 'search1') {
        localStorage.setItem('search1', JSON.stringify(selectedValue));
      } else {
        localStorage.setItem('search2', JSON.stringify(selectedValue));
      }
    }
    this.setModel();
  }
  setModel() {
    this.searchOne = localStorage.getItem('search1');
    this.searchTwo = localStorage.getItem('search2');
    if (this.searchOne) {
      this.searchOne = JSON.parse(this.searchOne);
      this.studyOneId = this.searchOne.study.studyId;
      this.studyOneTitle = this.searchOne.study.studyTitle;
      this.studyOneVersion = this.searchOne.auditTrail.SDRUploadVersion;
      this.studyOneUSDMVer = this.searchOne.auditTrail.usdmVersion;
      this.toolTipOne = this.studyOneTitle + '_Version' + this.studyOneVersion;
      localStorage.setItem(
        this.searchOne.study.studyId +
          '_' +
          this.searchOne.auditTrail.SDRUploadVersion +
          '_links',
        JSON.stringify(this.searchOne.links)
      );
    }
    if (this.searchTwo) {
      this.searchTwo = JSON.parse(this.searchTwo);
      this.studyTwoId = this.searchTwo.study.studyId;
      this.studyTwoTitle = this.searchTwo.study.studyTitle;
      this.studyTwoVersion = this.searchTwo.auditTrail.SDRUploadVersion;
      this.studyTwoUSDMVer = this.searchTwo.auditTrail.usdmVersion;
      this.toolTipTwo = this.studyTwoTitle + '_Version' + this.studyTwoVersion;
      localStorage.setItem(
        this.searchTwo.study.studyId +
          '_' +
          this.searchTwo.auditTrail.SDRUploadVersion +
          '_links',
        JSON.stringify(this.searchTwo.links)
      );
    }
    this.showSearch = false;
    this.clearSearch();
  }
  versionCompare() {
    this.ds.sendExitBool(true);
    this.router.navigate(
      [
        'studyCompare',
        {
          studyId: this.studyOneId,
          verA: this.studyOneVersion,
          verB: this.studyTwoVersion,
          studyId2: this.studyTwoId,
          studyOneTitle: this.studyOneTitle,
          studyTwoTitle: this.studyTwoTitle,
          usdmVerA: this.studyOneUSDMVer,
          usdmVerB: this.studyTwoUSDMVer,
        },
      ],
      { relativeTo: this.route }
    );
    this.selectedValue = null;
  }

  clear() {
    this.studyTwoTitle = '';
    this.studyOneTitle = '';
    localStorage.setItem('search1', '');
    localStorage.setItem('search2', '');
    // TO-DO Check if clearing  the links storage is needed ?
  }

  /**
   * Construct multiple values for sponsor id and interventional model
   * @param params   ag grid value of that particular row for which link is clicked.
   * @param type  Denotes for which value is the link clicked either for sponsor id or interventional model.
   */
  clearSearch() {
    this.editorForm.setValue({
      //nosonar
      studyTitle: '', //nosonar
      fromDate: '', //nosonar
      toDate: '', //nosonar
      sponsorId: '', //nosonar
    }); //nosonar
    this.showGrid = false;
  }
  redirect(from: any) {
    this.showSearch = true;
    this.from = from;
  }

  ngOnDestroy() {
    this.ds.sendClearBool(false);
  }

  restrictChar(event: {
    charCode: number;
    which: number;
    preventDefault: () => void;
  }) {
    this.commonMethod.restrictChar(event);
  }

  getToday(): string {
    return this.commonMethod.getToday();
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
    this.selectedValue = null;
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

  getSelectSearch(params: any) {
    if (params.data.selected) {
      this.selectedValue = params.data;
    }
  }

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

  submit() {
    this.setSearchValue(this.selectedValue);
    this.selectedValue = null;
  }
}
